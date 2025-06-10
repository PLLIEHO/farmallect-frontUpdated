import React from 'react'
import "../resources/styles.scss"
import { Table } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { add } from "../../actions/actions";
import { connect } from "react-redux";


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

class TriggerConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            primaryKey: null,
            ops: []
        }
    };

    postHandler = () => {
        let data = this.props.toSend;
        data = {
            ...data,
            primaryKey: this.state.primaryKey,
            ops: this.state.ops
        }

        const requestOptions2 = {
            method: 'POST',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch("http://localhost:8080/web/link/trigger/create/" + this.props.linkId, requestOptions2)
            .then((res) => {
                if (res.ok) {
                    res.json().then(
                        (result) => {
                            this.props.configHandler();
                        },
                        (error) => {

                        }
                    )
                } else {
                    res.json().then((res) => {
                        }
                    )
                }
            })
    }

    handleKey = (e) => {
        this.setState({primaryKey: e})
    }

    handleOps = (e) => {
        if(this.state.ops.includes(e)){
            let op = this.state.ops;
            let i = op.indexOf(e);
            op.splice(i, 1)
            this.setState({ops: op})
        }
        else {
            let op = this.state.ops;
            op.push(e)
            this.setState({ops: op})
        }
    }

    render() {
        return (
            <div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Выберите первичный ключ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.columns.map(
                        (key, i) => (
                    <tr>
                        <td>{key.columnName}</td>
                        <td><input type={"radio"} onChange={() => this.handleKey(key.columnName)} checked={this.state.primaryKey === key.columnName}/></td>
                    </tr>
                            ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>Выберите операции</td>
                    </tr>
                    <tr>
                        <td><input type={"checkbox"} onChange={() => this.handleOps("INSERT")} checked={this.state.ops.includes("INSERT")}/> INSERT   <input type={"checkbox"} onChange={() => this.handleOps("UPDATE")} checked={this.state.ops.includes("UPDATE")}/> UPDATE   <input type={"checkbox"} onChange={() => this.handleOps("DELETE")} checked={this.state.ops.includes("DELETE")}/> DELETE</td>
                    </tr>
                    </tfoot>
                </Table>
                <div className='justify-content-center d-flex d-md-block'>
                    <button disabled={(this.state.ops.includes("UPDATE") || this.state.ops.includes("DELETE")) && this.state.primaryKey === null} className='glow-btn-blue' onClick={this.postHandler}>Создать</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TriggerConfirm);
