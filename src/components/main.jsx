import React from 'react';
import TableElement from "./table/table.component";
import Spinner from 'react-bootstrap/Spinner';
import "./resources/styles.scss";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {Offcanvas, ToastContainer} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import Schedule from "./schedule/schedule";
import {bindActionCreators} from "redux";
import {add} from "../actions/actions";
import {connect} from "react-redux";
import Schedule_Portable from "./schedule/schedule_portable";
import FilterComponent from "./table/filterComponent";
import counter from "../reducers/counter";
import ToastAccepted from "./schedule/toastAccepted";


function mapStateToProps(state) {
    return {
        table: state.table,
        counter: state.counter
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
            link: "/api/med/",
            isLoaded: false,
            show: false,
            modal_show: false,
            modal_id: '',
            //table: props.table,
            filtersCountryList: [],
            filtersCompanyList: [],
            filtersFormList: [],
            filtersIngridientsList: [],
            filtersIndicationsList: [],
            filtersSideEffectsList: [],
            filtersContraindicationsList: [],
            filterName: "",
            filtersCountry: [],
            filtersCompany: [],
            filtersForm: [],
            filtersIngridients: [],
            filtersIndications: [],
            filtersSideEffects: [],
            filtersContraindications: [],
            ingridientsBoth: false,
            indicationsBoth: false,
            sideEffectsBoth: false,
            contraindicationsBoth: false,
            page: 1,
            size: 25,
            toasts: []
        }
    }

    componentDidMount() {
        let toSend = {
            name: this.state.filterName,
            company: this.state.filtersCompany,
            country: this.state.filtersCountry,
            form: this.state.filtersForm,
            ingridients: [],
            indications: [],
            sideEffects: [],
            contraindications: [],
            size: this.state.size,
            page: this.state.page
        }
        const requestOptions = {
            method: 'POST',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(toSend)
        };
        fetch(this.state.link + "medicaments", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.medicaments
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )

        const requestOptionsGet = {
            method: 'GET',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        //const fils = ["companies", "countries", "forms", "ingridients", "indications", "sideEffects", "contraindications"]
        fetch(this.state.link + "companies", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                    this.setState({filtersCompanyList: result.sort()});
                },
                (error) => {
                    this.setState({error});
                }
            )

        fetch(this.state.link + "countries", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                    this.setState({filtersCountryList: result.sort()});
                },
                (error) => {
                    this.setState({error});
                }
            )

        fetch(this.state.link + "forms", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                    this.setState({filtersFormList: result.sort()});
                },
                (error) => {
                    this.setState({error});
                }
            )

        fetch(this.state.link + "ingridients", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                    this.setState({filtersIngridientsList: result.sort()});
                },
                (error) => {
                    this.setState({error});
                }
            )

        fetch(this.state.link + "indications", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                    this.setState({filtersIndicationsList: result.sort()});
                },
                (error) => {
                    this.setState({error});
                }
            )

        fetch(this.state.link + "side-effects", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                    this.setState({filtersSideEffectsList: result.sort()});
                },
                (error) => {
                    this.setState({error});
                }
            )

        fetch(this.state.link + "contraindications", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                    this.setState({filtersContraindicationsList: result.sort()});
                },
                (error) => {
                    this.setState({error});
                }
            )
    }


    showToasts = (toasts) => {
        this.setState({toasts: toasts})
        this.forceUpdate();
    }

    // dropHandler = () => {
    //     this.setState({
    //         filtersCountry: [],
    //         filtersCompany: [],
    //         filtersForm: [],
    //         filtersIngridients: [],
    //         filtersIndications: [],
    //         filtersSideEffects: [],
    //         filtersContraindications: [],
    //     })
    // }

    ingridientsTumbler = () => {
        this.setState({ingridientsBoth: !this.state.ingridientsBoth})
    }
    indicationsTumbler = () => {
        this.setState({indicationsBoth: !this.state.indicationsBoth})
    }
    sideEffectsTumbler = () => {
        this.setState({sideEffectsBoth: !this.state.sideEffectsBoth})
    }
    contraindicationsTumbler = () => {
        this.setState({contraindicationsBoth: !this.state.contraindicationsBoth})
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
    pushToFiltersHandleIngridients = (e) => {
        console.log(e.target.value)
        if (this.state.filtersIngridients.length > 0) {
            let index = this.state.filtersIngridients.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({filtersIngridients: [...this.state.filtersIngridients, e.target.value]}));
            } else {

                this.setState({
                    filtersIngridients: this.state.filtersIngridients.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({filtersIngridients: [...this.state.filtersIngridients, e.target.value]}));
        }
    }
    pushToFiltersHandleIndications = (e) => {
        console.log(e.target.value)
        if (this.state.filtersIndications.length > 0) {
            let index = this.state.filtersIndications.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({filtersIndications: [...this.state.filtersIndications, e.target.value]}));
            } else {

                this.setState({
                    filtersIndications: this.state.filtersIndications.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({filtersIndications: [...this.state.filtersIndications, e.target.value]}));
        }
    }
    pushToFiltersHandleSideEffects = (e) => {
        console.log(e.target.value)
        if (this.state.filtersSideEffects.length > 0) {
            let index = this.state.filtersSideEffects.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({filtersSideEffects: [...this.state.filtersSideEffects, e.target.value]}));
            } else {

                this.setState({
                    filtersSideEffects: this.state.filtersSideEffects.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({filtersSideEffects: [...this.state.filtersSideEffects, e.target.value]}));
        }
    }
    pushToFiltersHandleContraindications = (e) => {
        console.log(e.target.value)
        if (this.state.filtersContraindications.length > 0) {
            let index = this.state.filtersContraindications.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({filtersContraindications: [...this.state.filtersContraindications, e.target.value]}));
            } else {

                this.setState({
                    filtersContraindications: this.state.filtersContraindications.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({filtersContraindications: [...this.state.filtersContraindications, e.target.value]}));
        }
    }


    searchHandler = (e) => {
        this.setState({filterName: e.target.value});
    }
    searchButtonHandler = () => {
        let toSend = {
            name: this.state.filterName,
            company: this.state.filtersCompany,
            country: this.state.filtersCountry,
            form: this.state.filtersForm,
            ingridients: this.state.filtersIngridients,
            ingridientsBoth: this.state.ingridientsBoth,
            indications: this.state.filtersIndications,
            indicationsBoth: this.state.indicationsBoth,
            sideEffects: this.state.filtersSideEffects,
            sideEffectsBoth: this.state.sideEffectsBoth,
            contraindications: this.state.filtersContraindications,
            contraindicationsBoth: this.state.contraindicationsBoth,
            size: this.state.size,
            page: this.state.page
        }
        const requestOptions = {
            method: 'POST',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(toSend)
        };
        fetch(this.state.link + "medicaments", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result.medicaments
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
        const filtersArray = [{
            name: "Страна",
            func: this.pushToFiltersHandleCountry,
            filtersList: this.state.filtersCountryList,
            tumbler: ""
        },
            {
                name: "Компания",
                func: this.pushToFiltersHandleCompany,
                filtersList: this.state.filtersCompanyList,
                tumbler: ""
            },
            {
                name: "Форма",
                func: this.pushToFiltersHandleForm,
                filtersList: this.state.filtersFormList,
                tumbler: ""
            },
            {
                name: "Состав",
                func: this.pushToFiltersHandleIngridients,
                filtersList: this.state.filtersIngridientsList,
                tumbler: this.ingridientsTumbler
            },
            {
                name: "Показания",
                func: this.pushToFiltersHandleIndications,
                filtersList: this.state.filtersIndicationsList,
                tumbler: this.indicationsTumbler
            },
            {
                name: "Побочные эффекты",
                func: this.pushToFiltersHandleSideEffects,
                filtersList: this.state.filtersSideEffectsList,
                tumbler: this.sideEffectsTumbler
            },
            {
                name: "Противопоказания",
                func: this.pushToFiltersHandleContraindications,
                filtersList: this.state.filtersContraindicationsList,
                tumbler: this.contraindicationsTumbler
            },
        ];
        let page;
        if (this.state.isLoaded) {
            page =
                <div className={"box-main"}>
                    {
                        this.state.response.map(
                            (bud, i) => (
                                <TableElement className={bud.name}
                                              id={bud.id} name={bud.name} company={bud.company}
                                              country={bud.country}
                                              ingreds={bud.ingridients}
                                              img={"https://e7.pngegg.com/pngimages/102/271/png-clipart-pills-pills.png"}
                                              funct={this.modalShow}></TableElement>
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
            </div>
        }
        return (
            <div>
                <div className="col-12">
                    <input className="glow-text-form-pink" type="text" value={this.state.filterName}
                           onChange={this.searchHandler}/>

                    <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-primary" onClick={this.searchButtonHandler}>Поиск</Button>
                        <Dropdown autoClose="outside">
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                Фильтры
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    filtersArray.map(
                                        (name, j) => (
                                            <FilterComponent name={name.name} func={name.func}
                                                             filtersList={name.filtersList}
                                                             tumbler={name.tumbler}></FilterComponent>
                                        )
                                    )
                                }
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
                            <Schedule_Portable funct={this.showToasts} id={this.state.modal_id}
                                               func={this.modalClose}></Schedule_Portable>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.setState({modal_show: false})}>Закрыть</Button>
                        </Modal.Footer>

                    </Modal>
                </div>
                {page}
                <ToastContainer position={"bottom-start"} containerPosition={"sticky"}>
                    {
                        this.state.toasts.map(
                            (id, i) => (
                                <ToastAccepted name={id} show={true}></ToastAccepted>
                            )
                        )
                    }
                </ToastContainer>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);