import React from 'react'
import "../resources/styles.scss"
import {Modal, Table} from "react-bootstrap";
import { bindActionCreators } from "redux";
import { add } from "../../actions/actions";
import { connect } from "react-redux";
import TriggerConfirm from "./TriggerConfirm";

function mapStateToProps(state) {
    return {
        table: state.table,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: bindActionCreators(add, dispatch)
    }
}

class TriggerCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns1: [],
            columns2: [],
            firstRow: Array.from({length: 100}),
            secondRow: Array.from({length: 100}),
            direction: true,
            toSend: null,
            modal: false,
            linkId: null,
            isLoading: false,
            columnsToModal: []
        }
    };


    componentDidMount()
    {
        this.setState({isLoading: true})
        const requestOptions = {
            method: 'GET',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch("http://localhost:8080/web/link/connection-info/" + this.props.data.connection_id + "/" + this.props.data.dbname1  + "/" + this.props.data.tableName1, requestOptions)
            .then((res) => {
                if(res.ok) {
                    res.json().then(
                        (result) => {
                            this.setState({columns1: result.columns})
                        },
                        (error) => {
                        }
                    )
                }
                else {
                    res.json().then((res) => {
                        }
                    )
                }
            })

        fetch("http://localhost:8080/web/link/connection-info/" + this.props.data.connection_id + "/" + this.props.data.dbname2  + "/" + this.props.data.tableName2, requestOptions)
            .then((res) => {
                if(res.ok) {
                    res.json().then(
                        (result) => {
                            this.setState({columns2: result.columns})
                        },
                        (error) => {
                        }
                    )
                }
                else {
                    res.json().then((res) => {
                        }
                    )
                }
            })
        this.setState({isLoading: false})
    }

    postHandler = () => {
        let left = this.state.firstRow;
        let right = this.state.secondRow;
        let passed = [];
        let result = [];
        let params = [];
        let toSend;
        console.log(left)
        if(this.state.direction){
            for(let i = 0; i<left.length; i++){
                if(right.length===i){
                    break
                }
                if(right[i] === undefined || left[i] === undefined) continue
                if(passed.includes(right[i])) continue;
                if(!!right[i].v) continue;
                if(this.state.columns1.find(x => x.columnName1 === left[i]).columnType !== this.state.columns2.find(x => x.columnName2 === right[i]).columnType) continue;
                if(!!left[i].v) {
                    let parameters = {
                        value: left[i].v,
                        columnName: right[i]
                    }
                    passed.push(right[i])
                    params.push(parameters)
                    continue
                }
                let columnsMatch = {
                    columnName1: left[i],
                    columnName2: right[i]
                }
                passed.push(right[i])
                result.push(columnsMatch)
            }
            this.setState({columnsToModal: this.state.columns2})
            toSend = {
                columnMatch: result,
                match: { tableName1: this.props.data.tableName1,
                    tableName2: this.props.data.tableName2
                },
                linkId: this.props.data.link_id,
                params: params
            }
        }
        else {
            for(let i = 0; i<right.length; i++){
                if(left.length===i){
                    break
                }
                if(right[i] === undefined || left[i] === undefined) continue
                if(passed.includes(left[i])) continue;
                if(!!left[i].v) continue;
                if(this.state.columns1.find(x => x.columnName1 === left[i]).columnType !== this.state.columns2.find(x => x.columnName2 === right[i]).columnType) continue;

                if(!!right[i].v) {
                    let parameters = {
                        value: right[i].v,
                        columnName: left[i]
                    }
                    passed.push(left[i])
                    params.push(parameters)
                    continue
                }
                let columnsMatch = {
                    columnName1: right[i],
                    columnName2: left[i]
                }
                passed.push(left[i])
                result.push(columnsMatch)
            }
            this.setState({columnsToModal: this.state.columns1})
            toSend = {
                columnMatch: result,
                match: { tableName1: this.props.data.tableName2,
                    tableName2: this.props.data.tableName1
                },
                params: params
            }
        }

        this.setState({linkId: this.props.data.link_id})
        this.setState({toSend: toSend})
        this.setState({modal: true})
    }



    modalClose = () => {
        this.setState({modal: false})
        this.props.close()
    }

    handleValueLeft = (e) => {
        let tmp = this.state.firstRow
        let id = e.target.id
        let value = e.target.value
        if(id.toString().at(0) === 'i') {
            value = this.refs[id]
            value = {
                v: value
            }
            id = id.toString().substring(4);
            }
        tmp[id] = value
        this.setState({name: e.target.value})
    }

    handleValueRight = (e) => {
        let tmp = this.state.secondRow
        let id = e.target.id
        let value = e.target.value
        if(id.toString().at(0) === 'i') {
            value = this.refs[id]
            value = {
                v: value
            }
            id = id.toString().substring(4);
        }
        tmp[id] = value
        this.setState({name: e.target.value})
    }

    handleChangeDirection = () => {
        this.setState({direction: !this.state.direction})
    }

    render() {
        let page;
        page = this.state.isLoading ? <div></div> :
            <div>
                <Table hover responsive>
                    <thead>
                    <tr>
                        <th>{this.props.data.tableName1}</th>
                        <th>{this.props.data.tableName2}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.connectedColumns.map(
                        (key, i) => (
                            <tr>
                                <td><select defaultValue={key.columnName1} onChange={(e) => this.handleValueLeft(e)}>
                                    {this.state.columns1.map(
                                        (key1, j) => (
                                            <option id={i.toString()} value={key1.columnName}>{key1.columnName}</option>
                                        )
                                    )}
                                    <option hidden={!this.state.direction} id={"input" + i}><input ref={"input" + i} type={"text"} onChange={(e) => this.handleValueLeft(e)}></input></option>
                                </select></td>
                                <td><select defaultValue={key.columnName2} onChange={(e) => this.handleValueRight(e)}>
                                    {this.state.columns2.map(
                                        (key1, j) => (
                                            <option id={i.toString()} value={key1.columnName}>{key1.columnName}</option>
                                        )
                                    )}
                                    <option hidden={this.state.direction} id={"input" + i}><input ref={"input" + i} type={"text"} onChange={(e) => this.handleValueRight(e)}></input></option>
                                </select></td>
                            </tr>
                        )
                    )}
                    {this.state.columns1.map(
                        (key, i ) => (
                            <tr>
                                <td><select onChange={(e) => this.handleValueLeft(e)}>
                                    {this.state.columns1.map(
                                        (key1, j) => (
                                            <option id={(i+this.props.data.connectedColumns).toString()} value={key1.columnName}>{key1.columnName}</option>
                                        )
                                    )}
                                    <option id={"input" + (i+this.props.data.connectedColumns)} hidden={!this.state.direction}><input ref={"input" + (i+this.props.data.connectedColumns)} type={"text"} onChange={(e) => this.handleValueLeft(e)}></input></option>
                                </select></td>
                                <td><select onChange={(e) => this.handleValueRight(e)}>
                                    {this.state.columns2.map(
                                        (key1, j) => (
                                            <option id={(i+this.props.data.connectedColumns).toString()} value={key1.columnName}>{key1.columnName}</option>
                                        )
                                    )}
                                    <option id={"input" + (i+this.props.data.connectedColumns)} hidden={this.state.direction}><input ref={"input" + (i+this.props.data.connectedColumns)} type={"text"} onChange={(e) => this.handleValueRight(e)}></input></option>
                                </select></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td hidden={this.state.direction} onClick={this.handleChangeDirection}>
                            {"<"}===
                        </td>
                        <td hidden={!this.state.direction} onClick={this.handleChangeDirection}>
                            ==={">"}
                        </td>
                    </tr>
                    </tfoot>
                </Table>
                <div className='justify-content-center d-flex d-md-block'>
                    <button className='glow-btn-blue' onClick={this.postHandler}>Создать триггер</button>
                </div>

                <Modal
                    show={this.state.modal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Создать триггер
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TriggerConfirm configHandler={this.modalClose} toSend={this.state.toSend} linkId={this.state.linkId} columns={this.state.columnsToModal}></TriggerConfirm>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>

                </Modal>
            </div>
        return (
            <div>
            {page}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TriggerCreate);
