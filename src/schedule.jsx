import React from 'react'
import "./styles.scss"
import Cell from "./schedule_cell";
import {Table} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {add} from "./actions/actions";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        table: state.table,
        count: state.count
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: bindActionCreators(add, dispatch)
    }
}

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            before_breackfast: {
                name: "",
                country: "",
                company: ""
            }
        }
    };

    render() {
        const numbers = [0, 1, 2, 3, 4, 5, 6]
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Понедельник</th>
                    <th>Вторник</th>
                    <th>Среда</th>
                    <th>Четверг</th>
                    <th>Пятница</th>
                    <th>Суббота</th>
                    <th>Воскресенье</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Перед завтраком</td>

                    {
                        numbers.map(
                            (name, i) => (
                                <td>{
                                    this.props.table.table[0][name].map(
                                        (id, j) => (
                                            this.props.table.table[0][name][id] !== null ?
                                                <Cell name={this.props.table.table[0][name][id]}></Cell> :
                                                <>-</>
                                        )
                                    )
                                }</td>
                            )
                        )
                    }
                </tr>
                <tr>
                    <td>После завтрака</td>
                    {
                        numbers.map(
                            (name, i) => (
                                <td>{
                                    this.props.table.table[1][name].map(
                                        (id, j) => (
                                            this.props.table.table[1][name][id] !== null ?
                                                <Cell name={this.props.table.table[1][name][id]}></Cell> :
                                                <>-</>
                                        )
                                    )
                                }</td>
                            )
                        )
                    }
                </tr>
                <tr>
                    <td>Перед обедом</td>
                    {
                        numbers.map(
                            (name, i) => (
                                <td>{
                                    this.props.table.table[2][name].map(
                                        (id, j) => (
                                            this.props.table.table[2][name][id] !== null ?
                                                <Cell name={this.props.table.table[2][name][id]}></Cell> :
                                                <>-</>
                                        )
                                    )
                                }</td>
                            )
                        )
                    }
                </tr>
                <tr>
                    <td>После обеда</td>
                    {
                        numbers.map(
                            (name, i) => (
                                <td>{
                                    this.props.table.table[3][name].map(
                                        (id, j) => (
                                            this.props.table.table[3][name][id] !== null ?
                                                <Cell name={this.props.table.table[3][name][id]}></Cell> :
                                                <>-</>
                                        )
                                    )
                                }</td>
                            )
                        )
                    }
                </tr>
                <tr>
                    <td>Перед ужином</td>
                    {
                        numbers.map(
                            (name, i) => (
                                <td>{
                                    this.props.table.table[4][name].map(
                                        (id, j) => (
                                            this.props.table.table[4][name][id] !== null ?
                                                <Cell name={this.props.table.table[4][name][id]}></Cell> :
                                                <>-</>
                                        )
                                    )
                                }</td>
                            )
                        )
                    }
                </tr>
                <tr>
                    <td>После ужина</td>
                    {
                        numbers.map(
                            (name, i) => (
                                <td>{
                                    this.props.table.table[5][name].map(
                                        (id, j) => (
                                            <Cell
                                                key={j}
                                                name={this.props.table.table[5][name][j]}></Cell>
                                        )
                                    )
                                }</td>
                            )
                        )
                    }
                </tr>
                </tbody>
            </Table>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
