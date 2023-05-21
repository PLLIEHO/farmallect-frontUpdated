import React, {useEffect, useState} from "react";
import "../resources/styles.scss"
import {useDispatch} from "react-redux";
import {remove} from "../../actions/actions";


export default function Cell(props) {
    const [name, setName] = useState("");
    const dispatch = useDispatch()

    // useEffect(() => {
    //         if (props.name !== "") {
    //             const requestOptions = {
    //                 method: 'GET',
    //                 data: {},
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json'
    //                 }
    //             };
    //             fetch("/api/med/medicament/" + props.name, requestOptions)
    //                 .then(res => res.json()).then((result) => {
    //                 setName(result.name);
    //             }, (error) => {
    //             })
    //         }
    //     }, [props.name]
    // )

    const deleteHandler = () => {
        dispatch(remove(props.day, props.time, props.id));
        props.funct();
    }

    if (props.name === "") {
        return (
            <div>
            </div>
        )
    } else {
        return (<div>
                <div className="row justify-content-center">
                </div>
                <div className="row-cell">
                    <div className="box">
                        <div className="cell-pink">
                            <div className="card-info">
                                <div className="card-text">
                                    <span className="company">{props.name.substring(0, 15)}...</span>
                                </div>
                            </div>
                            <div className="delete-button">
                                <button className="cal"
                                        onClick={deleteHandler}>
                                    <svg width="16" height="16">
                                        <path
                                            d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}