import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge, Position, useReactFlow, ReactFlowProvider,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {forEach} from "react-bootstrap/ElementChildren";
import {Modal} from "react-bootstrap";
import Configuration_Form from "./form/configuration__form";
import Connection__form from "./form/connection__form";
import DiagramComponent from "./diagramComponent";
import TriggerCreate from "./form/TriggerCreate";

function generateRandomNumberFromString(string) {
    let hash = 0;
    for (let i = 0; i < string?.length; i++) {
        let char = string?.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return Math.abs(hash);
}


class Diogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            edges: [],
            connections: [],
            databases: [],
            link: "http://localhost:8080/web/",
            loaded: 1,
            configurationModal: false,
            connectionModal: false,
            noConnections: false,
            tables: [],
            links: [],
            config: "",
            newConnection: "",
            ready: false,
            linkModal: false,
            currentTriggerCand: null
        }
    };


    handleLoaded = () => {
        // this.setState({loaded: true});
        this.setState({configurationModal: true});
    }

    handleLoadedNew = () => {
        // this.setState({loaded: true});
        this.setState({connectionModal: true});
    }

    handleLinkModal = (e) => {
        this.setState({currentTriggerCand: e})
        this.setState({linkModal: true})
    }


    findMatches = (match, link) => {

        let data;
        let connectedColumns = [];
        match.columnsMatchDTOList.forEach((dto) => {
            let percentage = dto.percentage;
            let nameMatch = dto.classOfMatchNames;
            let id = dto.id;
            let assembly = {
                "id": id,
                "percentage": percentage,
                "nameMatch": nameMatch,
                "columnName1": dto.columnName1,
                "columnName2": dto.columnName2
            }
            connectedColumns.push(assembly);
        })
        let database1 = link.database1.name;
        let database2 = link.database2.name;
        let link_id = link.id;
        let tNameMatch = match.classOfMatchNames;
        data = {
            query: {
                "link_id": link_id,
                "tableName1": match.tableName1,
                "tableName2": match.tableName2,
                "nameMatch": tNameMatch,
                "connectedColumns": connectedColumns,
                "dbname1": database1,
                "dbname2": database2,
                "connection_id": link.connection.id
            },
            func: this.handleLinkModal
        }
        let edge = {
            id: database1 + "_" + match.tableName1 + "_" + database2 + "_" + match.tableName2,
            source: database1 + "_" + match.tableName1,
            target: database2 + "_" + match.tableName2,
            type: 'buttonedge',
            data: data
        }
        console.log(edge)
        let edg = this.state.edges
        if(edg.some(x => x.id === edge.id))
        {return;}
        edg.push(edge)
        this.setState({edges: edg});
    }

    modalClose = (e) => {
        console.log(e);
        this.setState({config: e, configurationModal: false, loaded: 2});

        this.state.connections.forEach((con) => {
            const requestOptions2 = {
                method: 'POST',
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(e)
            };
            fetch(this.state.link + "link/establish/" + con.id, requestOptions2)
                .then((res) => {
                    if (res.ok) {
                        res.json().then(
                            (result) => {
                                result.forEach((res) => {
                                    res.matches.forEach((match) => {
                                        if (match !== null) {
                                        if (match.columnsMatchDTOList.length !== 0) {
                                            this.findMatches(match, res)
                                        }
                                    }
                                    })

                                })
                                this.setState({links: [...this.state.links, result]})
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
            })

        setTimeout(() => {
            console.log(this.state.edges)
            this.setState({loaded: 1})
        }, 7000);
    }

    modalConClose = (e) => {
        console.log(e);
        this.setState({newConnection: e, connectionModal: false});

            const requestOptions = {
                method: 'POST',
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(e)
            };
            fetch(this.state.link + "db/new-connection", requestOptions)
                .then((res) => {
                    if (res.ok) {
                        res.json().then(
                            (result) => {
                                console.log(result);
                                if(!!result) {
                                    this.setState({connections: [...this.state.connections, result]})
                                    } else {
                                    alert("Произошла ошибка при добавлении подключения")
                                }
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

    callDbs = (connections) => {
        let dbs = this.state.databases;
        connections.forEach((element) => {
            dbs = [...dbs, element.databases]
        })
        this.setState({databases: dbs});
        const requestOptions2 = {
            method: 'GET',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        connections.forEach((con) => {
            fetch(this.state.link + "link/connection-info/" + con.id, requestOptions2)
                .then((res) => {
                    if (res.ok) {
                        res.json().then(
                            (result) => {
                                result.forEach((res) => {
                                    res.viewName = res.databaseName + "_" + res.tableName;
                                })
                                this.setState({tables: [...this.state.tables, result]})
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
        })
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(this.state.link + "db/connection-info", requestOptions)
            .then((res) => {
                if (res.ok) {
                    res.json().then(
                        (result) => {
                            console.log(result);
                            this.setState({connections: result});
                            if (result.length === 0) {
                                this.setState({noConnections: true});
                            } else {
                                this.callDbs(result);
                            }
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

    generate = () =>  {
        console.log(1)
        this.setState({loaded: 2})
            this.state.tables.forEach((tabless) => {
                tabless.forEach((table) => {
                    if(table && table.databaseName) {
                        let x = generateRandomNumberFromString(table.databaseName) % 2000;
                        let y = (generateRandomNumberFromString(table.databaseName) / 100) % 2000;
                        let xOffset = Math.floor(Math.random() * 500);
                        let yOffset = Math.floor(Math.random() * 500);
                        let node = {
                            id: table.viewName,
                            position: {x: x + xOffset, y: y + yOffset},
                            data: {label: table.viewName},
                            width: 250,
                            // height: 50,
                            // handles: [
                            //     {
                            //         type: 'target',
                            //         position: Position.Top,
                            //         x: 100 / 2,
                            //         y: 0,
                            //     },
                            //     {
                            //         type: 'source',
                            //         position: Position.Bottom,
                            //         x: 100 / 2,
                            //         y: 50,
                            //     },
                            // ],
                        }
                        let tmp = this.state.nodes
                        tmp.push(node)
                        console.log(tmp)
                        this.setState({nodes: tmp});
                    }
                })
            })
        setTimeout(() => {
        this.setState({loaded: 1})
        }, 2000);

        console.log("tables ready")
        console.log("databases ready")
        setTimeout(() => {
            if(this.state.databases.length !== 0) {
                //handleLoaded();
            }
            else {
                //handleLoadedNew();
            }
        }, 2000);
    }

    render() {
        let page = this.state.loaded === 1
            ? <DiagramComponent nodes={this.state.nodes} edges={this.state.edges} newCon={this.handleLoadedNew} links={this.handleLoaded} generate={this.generate}/>
            : <div></div>
    return (
        <div>
            {page}
            <Modal
                show={this.state.configurationModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Конфигурация поиска связей
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Configuration_Form configHandler={this.modalClose}></Configuration_Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='glow-btn-blue' onClick={() => this.setState({configurationModal: false})}>Закрыть
                    </button>
                </Modal.Footer>

            </Modal>

            <Modal
                show={this.state.connectionModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Новое подключение
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Connection__form configHandler={this.modalConClose}></Connection__form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='glow-btn-blue' onClick={() => this.setState({connectionModal: false})}>Закрыть
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={this.state.linkModal}
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
                    <TriggerCreate close={() => this.setState({linkModal: false})} data={this.state.currentTriggerCand}></TriggerCreate>
                </Modal.Body>
                <Modal.Footer>
                    <button className='glow-btn-blue' onClick={() => this.setState({linkModal: false})}>Закрыть
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}}

export default Diogram;