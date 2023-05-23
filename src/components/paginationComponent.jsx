import {Pagination} from "react-bootstrap";
import "./resources/styles.scss";
import React, {useEffect, useState} from "react";


class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let limit = 5;
        let min_page = Math.max(1, this.props.currentPage - parseInt(limit / 2));
        let max_page = Math.min(this.props.currentPage + parseInt(limit / 2), this.props.pages);
        let toRender = [];
        if (min_page != 1) {
            toRender.push(<Pagination.First onClick={() => this.props.function(1)}/>);
        }
        for (let j = min_page; j <= max_page; ++j) {
            if (this.props.currentPage == j) {
                toRender.push(<Pagination.Item active>{j}</Pagination.Item>);
            } else {
                toRender.push(<Pagination.Item value={j} onClick={() => this.props.function(j)}>{j}</Pagination.Item>);
            }
        }
        if (max_page != this.props.pages) {
            toRender.push(<Pagination.Last onClick={() => this.props.function(this.props.pages)}/>);
        }
        return (
            <nav>
                <Pagination className="glow-pagination-pink justify-content-center">
                    {toRender}
                </Pagination>
            </nav>
        )
    }
}

export default PaginationComponent;