import React from 'react'
import "../resources/styles.scss"
import Cell from "./schedule_cell";
import {Table, ToastContainer} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {add, addCounter} from "../../actions/actions";
import {connect} from "react-redux";
import ToastAccepted from "./toastAccepted";

function mapStateToProps(state) {
    return {
        table: state.table,
        counter: state.counter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: bindActionCreators(add, dispatch),
        addCounter: bindActionCreators(addCounter, dispatch)
    }
}


class Schedule_Portable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            before_breackfast: {
                name: "",
                country: "",
                company: ""
            },
            goodToasts: [],
            badToasts: []
        }
    };

    buttonHandler = (e) => {
        if (true) {//TODO: проверочка на compatibility

            // this.props.addCounter(this.props.id);
            let toasts = this.state.goodToasts;
            toasts.push(this.props.id)
            this.setState({goodToasts: toasts})
            this.props.funct(this.state.goodToasts)
            console.log(this.state.goodToasts[0])
            this.props.add(parseInt(e.target.value), parseInt(e.target.id), this.props.id);
        }
        //console.log(this.props.table.table[parseInt(e.target.id)][parseInt(e.target.value)])
    }


    render() {
        const count = [0, 1, 2, 3, 4, 5, 6]
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Пнд</th>
                        <th>Втр</th>
                        <th>Срд</th>
                        <th>Чтв</th>
                        <th>Птн</th>
                        <th>Сбб</th>
                        <th>Вск</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Перед завтраком</td>
                        {
                            count.map(
                                (number) => (
                                    <td>
                                        <button value={number} id={'0'} onClick={this.buttonHandler}>+
                                        </button>
                                    </td>
                                )
                            )}
                    </tr>
                    <tr>
                        <td>После завтрака</td>
                        {
                            count.map(
                                (number) => (
                                    <td>
                                        <button value={number} id={'1'} onClick={this.buttonHandler}>+
                                        </button>
                                    </td>
                                )
                            )}
                    </tr>
                    <tr>
                        <td>Перед обедом</td>
                        {
                            count.map(
                                (number) => (
                                    <td>
                                        <button value={number} id={'2'} onClick={this.buttonHandler}>+
                                        </button>
                                    </td>
                                )
                            )}
                    </tr>
                    <tr>
                        <td>После обеда</td>
                        {
                            count.map(
                                (number) => (
                                    <td>
                                        <button value={number} id={'3'} onClick={this.buttonHandler}>+
                                        </button>
                                    </td>
                                )
                            )}
                    </tr>
                    <tr>
                        <td>Перед ужином</td>
                        {
                            count.map(
                                (number) => (
                                    <td>
                                        <button value={number} id={'4'} onClick={this.buttonHandler}>+
                                        </button>
                                    </td>
                                )
                            )}
                    </tr>
                    <tr>
                        <td>После ужина</td>
                        {
                            count.map(
                                (number) => (
                                    <td>
                                        <button value={number} id={'5'} onClick={this.buttonHandler}>+
                                        </button>
                                    </td>
                                )
                            )}
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule_Portable);