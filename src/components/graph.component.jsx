import "./resources/styles.scss";
import React, {useEffect, useReducer} from "react";
import {Navigate, useParams} from 'react-router-dom';
import {useState} from "react";
import {Modal, ToastContainer} from "react-bootstrap";
import Schedule_Portable from "./schedule/schedule_portable";
import Button from "react-bootstrap/Button";
import ToastAccepted from "./schedule/toastAccepted";
import ToastDeclined from "./schedule/toastDeclined";


export default function Graph() {
    const [isLoaded, setLoaded] = useState(false);
    const [isRedirect, setRedirect] = useState(false);
    const [isShow, setShow] = useState(false);
    const [toasts, setToasts] = useState({toasts: [], good: 0});
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [response, setResponse] = useState({
        'name': "",
        'company': "",
        'country': "",
        'form': "",
        "ingridients": [],
        'indications': [],
        'sideEffects': [],
        'contraindications': []
    });

    let ID = useParams().id;


    useEffect(() => {
            if (ID !== "-1") {
                const requestOptions = {
                    method: 'GET',
                    data: {},
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };
                fetch("/api/med/medicament/" + ID.replace(":", ""), requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setLoaded(true);
                            setResponse(result);
                        },
                        (error) => {
                            setLoaded(false)
                        }
                    )
            }
        }, []
    )

    function modalShow() {
        setShow(true);
    }

    function modalClose() {
        setShow(false);
    }

    function showToasts(toasts) {
        setToasts(toasts);
        forceUpdate();
    }

    return (
        <div>
            <div className="container">
                <div id="med">
                    <div className="main-info">
                        <img src={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                             alt={"amogus"}/>
                        <div style={{maxWidth: "400px"}}>
                            <span className="name">{response.name}</span>
                            <span className="company">{response.company}</span>
                            <span className="country">{response.country}</span>
                            <button onClick={modalShow}>Добавить в расписание</button>
                        </div>
                    </div>
                    <div>
                        <span className="second-text">Форма выпуска:</span>
                        <span>{response.form}</span>
                        <span className="second-text">Состав:</span>
                        <span>{
                            response.ingridients.map(
                                (ing, i) => (
                                    i < response.ingridients.length - 1 ?
                                        <>{ing}, </> : <>{ing}</>

                                )
                            )

                        }</span>
                        <span className="second-text">Показания к применению:</span>
                        <span>{
                            response.indications.map(
                                (ing, i) => (
                                    i < response.indications.length - 1 ?
                                        <>{ing}, </> : <>{ing}</>

                                )
                            )

                        }</span>
                        <span className="second-text">Побочное действие:</span>
                        <span>{
                            response.sideEffects.length > 0 ?
                                response.sideEffects.map(
                                    (ing, i) => (
                                        i < response.sideEffects.length - 1 ?
                                            <>{ing}, </> : <>{ing}</>

                                    )
                                ) : <p>Нет</p>
                        }</span>
                        <span className="second-text">Противопоказания к применению</span>
                        <span>{
                            response.contraindications.map(
                                (ing, i) => (
                                    i < response.contraindications.length - 1 ?
                                        <>{ing}, </> : <>{ing}</>

                                )
                            )

                        }</span>
                    </div>
                    <button onClick={() => setRedirect(true)}>Назад</button>
                    {
                        isRedirect && <Navigate to='/' replace={true}/>
                    }
                </div>
            </div>
            <Modal
                show={isShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить в расписание
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Schedule_Portable funct={showToasts} id={ID.replace(":", "")}
                                       func={modalClose}></Schedule_Portable>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)}>Закрыть</Button>
                </Modal.Footer>

            </Modal>
            <ToastContainer position={"bottom-start"} containerPosition={"sticky"}>
                {
                    toasts.good === 1 ?
                        toasts.toasts.map(
                            (id, i) => (
                                <ToastAccepted name={id} show={true}></ToastAccepted>
                            )
                        )
                        : toasts.toasts.map(
                            (id, i) => (
                                <ToastDeclined name={id} show={true}></ToastDeclined>
                            )
                        )
                }
            </ToastContainer>
        </div>
    );

}
