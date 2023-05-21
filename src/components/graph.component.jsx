import "./resources/styles.scss";
import React, {useEffect} from "react";
import {Navigate, useParams} from 'react-router-dom';
import {useState} from "react";


export default function Graph() {
    const [isLoaded, setLoaded] = useState(false);
    const [isRedirect, setRedirect] = useState(false);
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

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <div id="med">
                            <div className="main-info">
                                <img src={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                     alt={"amogus"}/>
                                <div>
                                    <span className="name">{response.name}</span>
                                    <span className="company">{response.company}</span>
                                    <span className="country">{response.country}</span>
                                    <button>Добавить в расписание</button>
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
                                <span className="second-text">Побочное действие</span>
                                <span>{
                                    response.sideEffects.map(
                                        (ing, i) => (
                                            i < response.sideEffects.length - 1 ?
                                                <>{ing}, </> : <>{ing}</>

                                        )
                                    )

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
                            <button onClick={() => setRedirect(true)}>Back</button>
                            {
                                isRedirect && <Navigate to='/' replace={true}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
