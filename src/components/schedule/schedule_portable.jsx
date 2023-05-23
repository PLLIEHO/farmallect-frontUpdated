import React from 'react'
import "../resources/styles.scss"
import Cell from "./schedule_cell";
import { Table, ToastContainer } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { add, addCounter } from "../../actions/actions";
import { connect } from "react-redux";
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
            goodToasts: { toasts: [], good: 1 },
            badToasts: { toasts: [], good: 0 }
        }
    };

    buttonHandler = (id, value) => {
        let answer = true;
        for (let i = 0; i < this.props.table.table[parseInt(id)][parseInt(value)].length; i++) {
            const toSend = {
                id1: parseInt(this.props.id),
                id2: parseInt(this.props.table.table[parseInt(id)][parseInt(value)][i])
            }
            const requestOptions = {
                method: 'POST',
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(toSend)
            };
            fetch("/api/med/compatibility", requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        if (!result.compatible) {
                            answer = false;
                        }
                    },
                    (error) => {
                    }
                )
        }

        setTimeout(() => {
            if (answer) {
                let toasts = this.state.goodToasts;
                toasts.toasts.push(this.props.id)
                this.setState({ goodToasts: toasts })
                this.props.funct(this.state.goodToasts)
                console.log(this.state.goodToasts[0])
                this.props.add(parseInt(value), parseInt(id), this.props.id);
            } else {
                let toasts = this.state.badToasts;
                toasts.toasts.push(this.props.id)
                this.setState({ badToasts: toasts })
                this.props.funct(this.state.badToasts)
                console.log(this.state.goodToasts[0])
            }
        }, 100)
        //console.log(this.props.table.table[parseInt(e.target.id)][parseInt(e.target.value)])
    }


    render() {
        const count = [0, 1, 2, 3, 4, 5, 6]
        return (
            <div id='add-table'>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Пн</th>
                            <th>Вт</th>
                            <th>Ср</th>
                            <th>Чт</th>
                            <th>Пт</th>
                            <th>Сб</th>
                            <th>Вс</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Перед завтраком</td>
                            {
                                count.map(
                                    (number) => (
                                        <td>
                                            <button value={number} id={'0'} onClick={() => this.buttonHandler('0', number)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                    <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
                                                </svg>
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
                                            <button value={number} id={'1'} onClick={() => this.buttonHandler('1', number)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                    <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
                                                </svg>
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
                                            <button value={number} id={'2'} onClick={() => this.buttonHandler('2', number)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                    <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
                                                </svg>
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
                                            <button value={number} id={'3'} onClick={() => this.buttonHandler('3', number)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                    <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
                                                </svg>
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
                                            <button value={number} id={'4'} onClick={() => this.buttonHandler('4', number)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                    <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
                                                </svg>
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
                                            <button value={number} id={'5'} onClick={() => this.buttonHandler('5', number)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                    <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
                                                </svg>
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