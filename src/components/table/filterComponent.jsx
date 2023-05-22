import "../resources/styles.scss";
import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";


export default function FilterComponent(props) {

    if (props.checkbox) {

    }

    // useEffect(() => {
    //
    // })

    if (props.filtersList.length > 0) {
        return (
            <div>
                {
                    props.filtersList.map(
                        (bud, i) => (
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    id="custom-switch"
                                    label={bud}
                                    value={bud}
                                    onChange={props.func}
                                    defaultChecked={props.filters.indexOf(bud) !== -1}
                                />
                            </Form>
                        )
                    )
                }
                {
                    props.tumbler !== "" ? <div>
                        <hr></hr>
                        <Form>
                            <Form.Check
                                type="checkbox"
                                id="custom-switch"
                                label={"В одном препарате"}
                                value={""}
                                onChange={props.tumbler}
                                defaultChecked={props.tumblerValue}
                            />
                        </Form>
                    </div> : <></>
                }
            </div>
        );

    } else {
        return (
            <Dropdown autoClose="outside">
                <Dropdown.Toggle variant="light" id="dropdown-button-drop-end"
                                 drop={'end'}>
                    {props.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Spinner animation="border" role="status" style={{width: "10px", height: "10px"}}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

}