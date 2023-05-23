import React, { useEffect, useState } from "react";
import "../resources/styles.scss"
import { useDispatch } from "react-redux";
import { remove } from "../../actions/actions";

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
        return (<div className="cell">
            <span>{props.name}</span>
            <div className="delete-button">
                <button onClick={deleteHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                    </svg>
                </button>
            </div>
        </div>
        )
    }
}