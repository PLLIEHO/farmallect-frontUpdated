import React from "react";
import "./styles.scss"

export default function Cell(props) {

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
                                    <span className="company">{props.name}</span>
                                </div>
                            </div>
                            <div className="delete-button">
                                <button className="cal">
                                    <svg width="16" height="16" viewBox="0 0 48 48">
                                        <path
                                            d="M35 44v-6h-6v-3h6v-6h3v6h6v3h-6v6ZM9 40q-1.2 0-2.1-.9Q6 38.2 6 37V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h13V4h3.25v3H35q1.2 0 2.1.9.9.9.9 2.1v15.1q-.75-.1-1.5-.1t-1.5.1v-5.6H9V37h16q0 .75.15 1.5t.4 1.5Zm0-23.5h26V10H9Zm0 0V10v6.5Z"/>
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