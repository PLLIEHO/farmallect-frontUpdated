import React from "react";
import "./styles.scss"
import Cell from "./schedule_cell";

export default function Pillar(props) {
    return (
        <div className={"pillar"}>
            <div className={"time"}>
                <Cell name={props.name}></Cell>
            </div>
            <div className={"time"}>
                <Cell name={props.name}></Cell>
            </div>
            <div className={"time"}>
                <Cell name={props.name}></Cell>
            </div>
            <div className={"time"}>
                <Cell name={props.name}></Cell>
            </div>
            <div className={"time"}>
                <Cell name={props.name}></Cell>
            </div>
            <div className={"time"}>
                <Cell name={props.name}></Cell>
            </div>
        </div>
    )
}