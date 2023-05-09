import React from 'react';
import TableElement from "./table.component";
import Spinner from 'react-bootstrap/Spinner';
import "./styles.scss";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {Offcanvas} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import Schedule from "./schedule";
import {bindActionCreators} from "redux";
import {add} from "./actions/actions";
import {connect} from "react-redux";
import Schedule_Portable from "./schedule_portable";


function mapStateToProps(state) {
    return {
        table: state.table,
        count: state.count
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: bindActionCreators(add, dispatch)
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: "awfdawfdafwfgrgdrg.com",
            isLoaded: false,
            show: false,
            modal_show: false,
            modal_id: '',
            //table: props.table,
            filtersCountry: [],
            filtersCompany: [],
            filtersForm: []
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(this.state.link, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.table
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    pushToFiltersHandleCountry = (e) => {
        console.log(e.target.value)
        if (this.state.filtersCountry.length > 0) {
            let index = this.state.filtersCountry.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({filtersCountry: [...this.state.filtersCountry, e.target.value]}));
            } else {

                this.setState({
                    filtersCountry: this.state.filtersCountry.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({filtersCountry: [...this.state.filtersCountry, e.target.value]}));
        }
    }
    pushToFiltersHandleCompany = (e) => {
        console.log(e.target.value)
        if (this.state.filtersCompany.length > 0) {
            let index = this.state.filtersCompany.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({filtersCompany: [...this.state.filtersCompany, e.target.value]}));
            } else {

                this.setState({
                    filtersCompany: this.state.filtersCompany.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({filtersCompany: [...this.state.filtersCompany, e.target.value]}));
        }
    }
    pushToFiltersHandleForm = (e) => {
        console.log(e.target.value)
        if (this.state.filtersForm.length > 0) {
            let index = this.state.filtersForm.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({filtersForm: [...this.state.filtersForm, e.target.value]}));
            } else {

                this.setState({
                    filtersForm: this.state.filtersForm.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({filtersForm: [...this.state.filtersForm, e.target.value]}));
        }
    }


    searchHandler = () => {
        this.setState({test_state1: !this.state.test_state1});

    }
    modalShow = (e) => {
        this.setState({modal_id: e.target.id});
        this.setState({modal_show: true});
    }
    modalClose = () => {
        this.setState({modal_show: false});
        this.setState({modal_id: ''});
    }
    handleClose = () => this.setState({show: false});
    toggleShow = () => this.setState({show: true});


    render() {
        let page;
        if (this.state.isLoaded) {
            page =
                <div className={"box-main"}>
                    {
                        this.state.response.map(
                            (bud, i) => (
                                <TableElement id={i} name={bud.name} company={bud.company} country={bud.country}
                                              ingreds={bud.ingreds}></TableElement>
                            )
                        )
                    }
                </div>
        } else {
            page = <div>
                <Container>
                    <Row>
                        <Col>
                            <Spinner animation="border" role="status" style={{width: "100px", height: "100px"}}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>
                <div className={"box-main"}>
                    <TableElement id={-1} name={"Test"} company={"Test inc."} country={"Neverland"}
                                  ingreds={"Placebo"}
                                  img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                  funct={this.modalShow}></TableElement>
                    <TableElement id={-1} name={"Test"} company={"Test inc."} country={"Neverland"}
                                  ingreds={"Placebo"}
                                  img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                  funct={this.modalShow}></TableElement>
                    <TableElement id={-1} name={"Test"} company={"Test inc."} country={"Neverland"}
                                  ingreds={"Placebo"}
                                  img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                  funct={this.modalShow}></TableElement>
                    <TableElement id={-1} name={"Test"} company={"Test inc."} country={"Neverland"}
                                  ingreds={"Placebo"}
                                  img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                  funct={this.modalShow}></TableElement>
                    <TableElement id={-1} name={"Test"} company={"Test inc."} country={"Neverland"}
                                  ingreds={"Placebo"}
                                  img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                  funct={this.modalShow}></TableElement>
                    <TableElement id={-1} name={"Test"} company={"Test inc."} country={"Neverland"}
                                  ingreds={"Placebo"}
                                  img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                  funct={this.modalShow}></TableElement>
                    <TableElement id={-1} name={"Test"} company={"Test inc."} country={"Neverland"}
                                  ingreds={"Placebo"}
                                  img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                  funct={this.modalShow}></TableElement>
                </div>
            </div>
        }
        return (
            <div>
                <div className="col-12">
                    <input className="glow-text-form-pink" type="text"/>

                    <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-primary">Поиск</Button>
                        <Dropdown autoClose="outside">
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                Фильтры
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown autoClose="outside">
                                    <Dropdown.Toggle variant="light" id="dropdown-button-drop-end"
                                                     drop={'end'}>
                                        Страна-производитель
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.ItemText>
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    id="custom-switch"
                                                    label="Россия"
                                                    value={"Россия"}
                                                    onChange={this.pushToFiltersHandleCountry}
                                                />
                                            </Form>
                                        </Dropdown.ItemText>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="США"
                                                value={"США"}
                                                onChange={this.pushToFiltersHandleCountry}
                                            />
                                        </Form></Dropdown.ItemText>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="Япония"
                                                value={"Япония"}
                                                onChange={this.pushToFiltersHandleCountry}
                                            />
                                        </Form></Dropdown.ItemText>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown autoClose={"outside"}>
                                    <Dropdown.Toggle variant="light" id="dropdown-button-drop-end"
                                                     drop={'end'}>
                                        Компания
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="Bayer"
                                                value={"Bayer"}
                                                onChange={this.pushToFiltersHandleCompany}
                                            />
                                        </Form></Dropdown.ItemText>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="Эвалар"
                                                value={"Эвалар"}
                                                onChange={this.pushToFiltersHandleCompany}
                                            />
                                        </Form></Dropdown.ItemText>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="Plantego"
                                                value={"Plantego"}
                                                onChange={this.pushToFiltersHandleCompany}
                                            />
                                        </Form></Dropdown.ItemText>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown autoClose={"outside"}>
                                    <Dropdown.Toggle variant="light" id="dropdown-button-drop-end"
                                                     drop={'end'}>
                                        Форма выпуска
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="Таблетки"
                                                value={"Таблетки"}
                                                onChange={this.pushToFiltersHandleForm}
                                            />
                                        </Form></Dropdown.ItemText>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="Бальзам"
                                                value={"Бальзам"}
                                                onChange={this.pushToFiltersHandleForm}
                                            />
                                        </Form></Dropdown.ItemText>
                                        <Dropdown.ItemText><Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-switch"
                                                label="Мазь"
                                                value={"Мазь"}
                                                onChange={this.pushToFiltersHandleForm}
                                            />
                                        </Form></Dropdown.ItemText>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="outline-success" onClick={this.toggleShow} className="me-2">Расписание</Button>
                        <Offcanvas className={"offcanvas-size-xxl"} show={this.state.show} onHide={this.handleClose}
                                   placement={'end'}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Расписание</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Schedule/>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </ButtonGroup>
                    <Modal
                        show={this.state.modal_show}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Добавить в расписание
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Schedule_Portable id={this.state.modal_id} func={this.modalClose}></Schedule_Portable>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.setState({modal_show: false})}>Закрыть</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {page}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);