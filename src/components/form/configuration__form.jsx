import React from 'react'
import "../resources/styles.scss";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";


class Configuration_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabledN: true,
            caseSensitiveN: false,
            percentageOfmatchN: 50,
            enabledCN: true,
            caseSensitiveCN: false,
            percentageOfmatchCN: 50,
            enabledC: true,
            rowToStartC: 100,
            numberOfRowsC: 0,
            percentageOfMatchesC: 50
        }
    };

    postHandler() {
        const toSend = {

                "nameMatchConfiguration": {
                    "enabled": this.state.enabledN,
                    "caseSensitive": this.state.caseSensitiveN,
                    "percentageOfmatch": this.state.percentageOfmatchN,
                },
                "columnMatchConfiguration": {
                    "nameMatchConfiguration": {
                        "enabled": this.state.enabledCN,
                        "caseSensitive": this.state.caseSensitiveCN,
                        "percentageOfmatch": this.state.percentageOfmatchCN,
                    },
                    "contentMatchConfiguration": {
                        "enabled": this.state.enabledC,
                        "rowToStart": this.state.rowToStartC,
                        "numberOfRows": this.state.numberOfRowsC,
                        "percentageOfMatches": this.state.percentageOfMatchesC
                    }
                }

        }
        console.log(toSend);
        return toSend;
    }




    handleNameEnabled = () => {
        this.setState({enabledN: !this.state.enabledN})
    }

    handleNameCase = () => {
        this.setState({caseSensitiveN: !this.state.caseSensitiveN})
    }

    handleCNameEnabled = () => {
        this.setState({enabledCN: !this.state.enabledCN})
    }

    handleCNameCase = () => {
        this.setState({caseSensitiveCN: !this.state.caseSensitiveCN})
    }

    handleCEnabled = () => {
        console.log(1)
        this.setState({enabledC: !this.state.enabledC})
    }

    handleNamePercentage = (e) => {
        console.log(e.target.value);
        this.setState({percentageOfmatchN: e.target.value})
    }

    handleCNamePercentage = (e) => {
        this.setState({percentageOfmatchCN: e.target.value})
    }

    handleCStart = (e) => {
        this.setState({rowToStartC: e.target.value})
    }

    handleCOffset = (e) => {
        this.setState({numberOfRowsC: e.target.value})
    }

    handleCPercentage = (e) => {
        this.setState({percentageOfMatchesC: e.target.value})
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
                            <td>Названия таблиц: включить сравнение</td>
                            <td>
                                <input type={"checkbox"} checked={this.state.enabledN} onChange={this.handleNameEnabled}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Названия таблиц: учитывать регистр
                            </td>
                            <td>
                                <input type={"checkbox"} checked={this.state.caseSensitiveN} onChange={this.handleNameCase}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Названия таблиц: процент совпадения
                            </td>
                            <td>
                                <input type={"number"} value={this.state.percentageOfmatchN} onChange={(e) => this.handleNamePercentage(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Названия колонок: включить сравнение</td>
                            <td>
                                <input type={"checkbox"} checked={this.state.enabledCN} onChange={this.handleCNameEnabled}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Названия колонок: учитывать регистр
                            </td>
                            <td>
                                <input type={"checkbox"} checked={this.state.caseSensitiveCN} onChange={this.handleCNameCase}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Названия колонок: процент совпадения
                            </td>
                            <td>
                                <input type={"number"} value={this.state.percentageOfmatchCN} onChange={(e) => this.handleCNamePercentage(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Содержимое колонок: включить сравнение
                            </td>
                            <td>
                                <input type={"checkbox"} checked={this.state.enabledC} onChange={this.handleCEnabled}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Содержимое колонок: сколько строк сравнивать
                            </td>
                            <td>
                                <input type={"number"} value={this.state.rowToStartC} onChange={(e) => this.handleCStart(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Содержимое колонок: строка начала сравнения
                            </td>
                            <td>
                                <input type={"number"} value={this.state.numberOfRowsC} onChange={(e) => this.handleCOffset(e)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Содержимое колонок: процент совпадения
                            </td>
                            <td>
                                <input type={"number"} value={this.state.percentageOfMatchesC} onChange={(e) => this.handleCPercentage(e)}/>
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