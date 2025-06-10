import React from 'react'
import "../resources/styles.scss";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";


class Configuration_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host: "localhost",
            port: 5432,
            user: "postgres",
            password: "postgres",
            connectionString: "",
            typeOfDatabase: "POSTGRESQL",
            database: "postgres",
        }
    };

    postHandler() {
        const toSend = {
                "connectionString": {
                    "host": this.state.host,
                    "port": this.state.port,
                    "username": this.state.user,
                    "password": this.state.password,
                    "connectionString": "jdbc:" + this.state.typeOfDatabase.toLowerCase() + "://" + this.state.host + ":" + this.state.port + "/" + this.state.database,
                    "database": this.state.database
                },
                "typeOfDatabase": this.state.typeOfDatabase
                }
        console.log(toSend);
        return toSend;
    }




    handleHost = (e) => {
        this.setState({host: e.target.value})
    }

    handlePort = (e) => {
        this.setState({port: e.target.value})
    }

    handleUser = (e) => {
        this.setState({user: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleDatabase = (e) => {
        this.setState({database: e.target.value})
    }

    handleTypeOfDatabase = (e) => {
        console.log(e.target.value);
        this.setState({typeOfDatabase: e.target.value})
    }

    render() {
        return (
            <div id='add-table'>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Значение</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Хост</td>
                            <td>
                                <input type={"text"} value={this.state.host} onChange={(e) => this.handleHost(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Порт
                            </td>
                            <td>
                                <input type={"number"} value={this.state.port} onChange={(e) => this.handlePort(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Имя пользователя
                            </td>
                            <td>
                                <input type={"text"} value={this.state.user} onChange={(e) => this.handleUser(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Пароль</td>
                            <td>
                                <input type={"text"} value={this.state.password} onChange={(e) => this.handlePassword(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                База данных
                            </td>
                            <td>
                                <input type={"text"} value={this.state.database} onChange={(e) => this.handleDatabase(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Тип СУБД
                            </td>
                            <td>
                                <select name={"SUBD"} defaultValue={"POSTGRESQL"} onChange={(e) => this.handleTypeOfDatabase(e)}>
                                    <option value={"POSTGRESQL"}>Postgres</option>
                                    <option value={"MYSQL"}>MySQL</option>
                                    <option value={"MSSQL"}>MSSQL</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                    <Button onClick={() => this.props.configHandler(this.postHandler())}>Применить</Button>
                        </td>
                    </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }
}

export default Configuration_Form;