import {Pagination} from "react-bootstrap";
import "./resources/styles.scss";
import React, {useEffect, useState} from "react";


class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let pages = [];
        for (let j = 1; j <= this.props.pages; j++) {
            pages[j - 1] = j;
        }
        let toRender;
        if (pages.length < 6) {
            toRender =
                <>
                    {
                        pages.map(
                            (i) => i !== this.props.currentPage ?
                                <Pagination.Item onClick={() => this.props.function(i)}>{i}</Pagination.Item> :
                                <Pagination.Item active>{i}</Pagination.Item>
                        )
                    }
                </>
        } else if (this.props.currentPage === pages[0]) {
            toRender =
                <>

                    <Pagination.Item active>{this.props.currentPage}</Pagination.Item>
                    <Pagination.Item value={this.props.currentPage + 1}
                                     onClick={() => this.props.function(this.props.currentPage + 1)}>{this.props.currentPage + 1}</Pagination.Item>
                    <Pagination.Item value={this.props.currentPage + 2}
                                     onClick={() => this.props.function(this.props.currentPage + 2)}>{this.props.currentPage + 2}</Pagination.Item>
                    <Pagination.Ellipsis disabled/>

                </>

        } else if (this.props.currentPage < pages.length) {
            toRender =
                <>

                    <Pagination.Ellipsis disabled/>
                    <Pagination.Item
                        value={this.props.currentPage - 1}
                        onClick={() => this.props.function(this.props.currentPage - 1)}>{this.props.currentPage - 1}</Pagination.Item>
                    <Pagination.Item active>{this.props.currentPage}</Pagination.Item>
                    <Pagination.Item
                        value={this.props.currentPage + 1}
                        onClick={() => this.props.function(this.props.currentPage + 1)}>{this.props.currentPage + 1}</Pagination.Item>
                    <Pagination.Ellipsis disabled/>

                </>

        } else {
            toRender =
                <>
                    <Pagination.Ellipsis disabled/>
                    <Pagination.Item
                        value={this.props.currentPage - 2}
                        onClick={() => this.props.function(this.props.currentPage - 2)}>{this.props.currentPage - 2}</Pagination.Item>
                    <Pagination.Item
                        value={this.props.currentPage - 1}
                        onClick={() => this.props.function(this.props.currentPage - 1)}>{this.props.currentPage - 1}</Pagination.Item>
                    <Pagination.Item active>{this.props.currentPage}</Pagination.Item>

                </>

        }
        return (
            <Pagination>
                <Pagination.First onClick={() => this.props.function(1)}/>
                {toRender}
                <Pagination.Last onClick={() => this.props.function(this.props.pages)}/>
            </Pagination>
        )
    }
}

export default PaginationComponent;