import React from 'react'
import "../resources/styles.scss"
import Cell from "./schedule_cell";
import { Table } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { add } from "../../actions/actions";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

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

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            before_breackfast: {
                name: "",
                country: "",
                company: ""
            },
            csv: ""
        }
    };


    downloadHandler = () => {


        const array = this.props.table.count;

        console.log(array)
        // const temp = []
        let tempTime = []
        const days = "#, Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье,"
        tempTime.push(days)
        tempTime.push('\n')
        const times = ["Перед завтраком,", "После завтрака,", "Перед обедом,", "После обеда,", "Перед ужином,", "После ужина,"]

        for (let time = 0; time < 6; time++) {
            tempTime.push(times[time])
            for (let day = 0; day < 7; day++) {
                let tempDay = ""
                if (array[time][day].length > 0) {
                    array[time][day].map((bud, b) => {

                        b < array[time][day].length - 1 ?
                            tempDay += bud + ";" : tempDay += bud
                    })
                } else {
                    tempDay += " ";
                }
                tempDay += ",";
                tempTime.push(tempDay)
            }
            tempTime.push('\n')
        }

        // array.map((arr1, j) => {
        //     arr1.map((arr, i) => {
        //         const line = arr.join(",")
        //         temp.push(i === 0 ? `${line}\n` : line)
        //     })
        // })
        console.log(tempTime)
        const csvString = tempTime.join("")
        console.log(csvString)
        this.setState({ csv: csvString })
        let data = new Blob([csvString], {
            type: 'text/csv'
        }),
            csvURL = window.URL.createObjectURL(data),
            tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'myCSVFile.csv');
        tempLink.click();
    }

    deleteHandler = () => {
        this.forceUpdate();
    }

    render() {
        const numbers = [0, 1, 2, 3, 4, 5, 6]
        const time = [0, 1, 2, 3, 4, 5, 6]
        return (
            <div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th></th>
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
                                        <td className='cell-box'>{
                                            this.props.table.table[0][name].map(
                                                (id, j) => (
                                                    this.props.table.table[0][name][j] !== null ?
                                                        <Cell
                                                            name={this.props.table.count[0][name][j]}
                                                            day={name}
                                                            time={0}
                                                            id={id}
                                                            funct={this.deleteHandler}
                                                        >{console.log(this.props.table.table[0][0][0])}</Cell> :
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
                                        <td className='cell-box'>{
                                            this.props.table.table[1][name].map(
                                                (id, j) => (
                                                    this.props.table.table[1][name][j] !== null ?
                                                        <Cell name={this.props.table.count[1][name][j]}
                                                            day={name}
                                                            time={1}
                                                            id={id}
                                                            funct={this.deleteHandler}
                                                        ></Cell> :
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
                                        <td className='cell-box'>{
                                            this.props.table.table[2][name].map(
                                                (id, j) => (
                                                    this.props.table.table[2][name][j] !== null ?
                                                        <Cell name={this.props.table.count[2][name][j]}
                                                            day={name}
                                                            time={2}
                                                            id={id}
                                                            funct={this.deleteHandler}
                                                        ></Cell> :
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
                                        <td className='cell-box'>{
                                            this.props.table.table[3][name].map(
                                                (id, j) => (
                                                    this.props.table.table[3][name][j] !== null ?
                                                        <Cell name={this.props.table.count[3][name][j]}
                                                            day={name}
                                                            time={3}
                                                            id={id}
                                                            funct={this.deleteHandler}
                                                        ></Cell> :
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
                                        <td className='cell-box'>{
                                            this.props.table.table[4][name].map(
                                                (id, j) => (
                                                    this.props.table.table[4][name][j] !== null ?
                                                        <Cell name={this.props.table.count[4][name][j]}
                                                            day={name}
                                                            time={4}
                                                            id={id}
                                                            funct={this.deleteHandler}
                                                        ></Cell> :
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
                                        <td className='cell-box'>{
                                            this.props.table.table[5][name].map(
                                                (id, j) => (
                                                    <Cell
                                                        day={name}
                                                        time={5}
                                                        id={id}
                                                        key={j}
                                                        funct={this.deleteHandler}
                                                        name={this.props.table.count[5][name][j]}></Cell>
                                                )
                                            )
                                        }</td>
                                    )
                                )
                            }
                        </tr>
                    </tbody>
                </Table>
                <div className='justify-content-center d-flex d-md-block'>
                    <button className='glow-btn-blue' onClick={this.downloadHandler}>Скачать в формате .csv</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
