import "./styles.scss";
import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {useState} from "react";


export default function Graph() {
    const [isLoaded, setLoaded] = useState(false);
    const [response, setResponse] = useState({
        'name': "Test",
        'company': "Test Inc.",
        'country': "Neverland",
        'form': "Таблетки",
        'ingreds': ["Placebo"],
        'indications': ["Недостаток всех витаминов"],
        'dosing': "Раз в два часа",
        'sides': "Не обнаружены",
        'contras': "Животным нельзя",
        'img': "https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"
    });

    let ID = useParams().id;


    useEffect(() => {
            if (ID !== "-1") {
                let IDtoSend = {id: ID}
                const requestOptions = {
                    method: 'POST',
                    data: {},
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(IDtoSend)
                };
                fetch("aboba.com", requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setLoaded(true);
                            setResponse(result.data);
                        },
                        (error) => {
                            setLoaded(false)
                        }
                    )
            }
        }
    )

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <div id="med">
                            <div className="main-info">
                                <img src={response.img} alt={"amogus"}/>
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
                                <span>{response.ingreds}</span>
                                <span className="second-text">Показания к применению:</span>
                                <span>{response.indications}</span>
                                <span className="second-text">Режим дозирования:</span>
                                <span>{response.dosing}</span>
                                <span className="second-text">Побочное действие</span>
                                <span>{response.sides}</span>
                                <span className="second-text">Противопоказания к применению</span>
                                <span>{response.contras}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
