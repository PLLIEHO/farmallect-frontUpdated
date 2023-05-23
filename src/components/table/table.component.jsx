import React from "react";
import "../resources/styles.scss";
import {Navigate, redirect} from "react-router-dom";


class TableElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            link: '/:'.concat(props.id)
        }
    }


    render() {
        return (
            <div className="glow-card-pink">
                <div className="card-info">
                    <img src={this.props.img}/>
                    <div className="card-text">
                        <span className="name">{this.props.name}</span>
                        <span className="company">{this.props.company}</span>
                        <span className="country">{this.props.country}</span>
                        <span className="second-text">Состав:</span>
                        <span>{
                            this.props.ingreds.map(
                                (ing, i) => (
                                    i < this.props.ingreds.length - 1 ?
                                        <>{ing}, </> : <>{ing}</>

                                )
                            )
                        }</span>
                    </div>
                </div>
                <div className="buttons">
                    <button className="cal" id={this.props.id} onClick={this.props.funct}>
                        <svg width="32" height="32" viewBox="0 0 48 48" id={this.props.id}>
                            <path id={this.props.id}
                                  d="M35 44v-6h-6v-3h6v-6h3v6h6v3h-6v6ZM9 40q-1.2 0-2.1-.9Q6 38.2 6 37V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h13V4h3.25v3H35q1.2 0 2.1.9.9.9.9 2.1v15.1q-.75-.1-1.5-.1t-1.5.1v-5.6H9V37h16q0 .75.15 1.5t.4 1.5Zm0-23.5h26V10H9Zm0 0V10v6.5Z"/>
                        </svg>
                    </button>
                    <button className="more" onClick={() => this.setState({redirect: true})}>
                        <svg width="32" height="32" viewBox="0 0 48 48">
                            <path
                                d="M18.85 25.5H5.5q-.65 0-1.075-.425Q4 24.65 4 24q0-.65.425-1.075Q4.85 22.5 5.5 22.5h13.35l-5.5-5.55q-.4-.45-.425-1.05-.025-.6.425-1.05.45-.45 1.05-.45.6 0 1.05.45l8.1 8.1Q24 23.4 24 24q0 .6-.45 1.05l-8.1 8.1q-.45.45-1.05.45-.6 0-1.05-.45-.45-.45-.425-1.05.025-.6.425-1.05Zm9.65-8q-.65 0-1.075-.425Q27 16.65 27 16q0-.65.425-1.075.425-.425 1.075-.425h14q.65 0 1.075.425Q44 15.35 44 16q0 .65-.425 1.075-.425.425-1.075.425Zm0 16q-.65 0-1.075-.425Q27 32.65 27 32q0-.65.425-1.075.425-.425 1.075-.425h14q.65 0 1.075.425Q44 31.35 44 32q0 .65-.425 1.075-.425.425-1.075.425Zm6-8q-.65 0-1.075-.425Q33 24.65 33 24q0-.65.425-1.075.425-.425 1.075-.425h8q.65 0 1.075.425Q44 23.35 44 24q0 .65-.425 1.075-.425.425-1.075.425Z"/>
                        </svg>
                    </button>
                    {this.state.redirect && <Navigate to={this.state.link} replace={false}/>}
                </div>
            </div>
        );
    }
}

export default TableElement;
