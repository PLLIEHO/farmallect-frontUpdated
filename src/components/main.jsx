import React from 'react';
import TableElement from "./table/table.component";
import Spinner from 'react-bootstrap/Spinner';
import "./resources/styles.scss";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
    Accordion,
    AccordionButton,
    CloseButton,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    OffcanvasTitle,
    ToastContainer
} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Schedule from "./schedule/schedule";
import { bindActionCreators } from "redux";
import { add } from "../actions/actions";
import { connect } from "react-redux";
import Schedule_Portable from "./schedule/schedule_portable";
import FilterComponent from "./table/filterComponent";
import ToastAccepted from "./schedule/toastAccepted";
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import ToastDeclined from "./schedule/toastDeclined";
import PaginationComponent from "./paginationComponent";


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
            pages: 0,
            size: 10,
            toasts: { toasts: [], good: 1 },
            showFiltersOffcanvas: false
        }
    }

    componentDidMount() {
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
                        response: result.medicaments,
                        pages: result.pages
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
                this.setState({ filtersCompanyList: result.sort() });
            },
                (error) => {
                    this.setState({ error });
                }
            )

        fetch(this.state.link + "countries", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                this.setState({ filtersCountryList: result.sort() });
            },
                (error) => {
                    this.setState({ error });
                }
            )

        fetch(this.state.link + "forms", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                this.setState({ filtersFormList: result.sort() });
            },
                (error) => {
                    this.setState({ error });
                }
            )

        fetch(this.state.link + "ingridients", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                this.setState({ filtersIngridientsList: result.sort() });
            },
                (error) => {
                    this.setState({ error });
                }
            )

        fetch(this.state.link + "indications", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                this.setState({ filtersIndicationsList: result.sort() });
            },
                (error) => {
                    this.setState({ error });
                }
            )

        fetch(this.state.link + "side-effects", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                this.setState({ filtersSideEffectsList: result.sort() });
            },
                (error) => {
                    this.setState({ error });
                }
            )

        fetch(this.state.link + "contraindications", requestOptionsGet)
            .then(res => res.json())
            .then((result) => {
                this.setState({ filtersContraindicationsList: result.sort() });
            },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    changePageHandler = (page) => {
        this.setState({ page: page })
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
            page: page
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
                        response: result.medicaments,
                        pages: result.pages
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )

        //this.forceUpdate();
    }


    showToasts = (toasts) => {
        this.setState({ toasts: toasts })
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
    //         filtersContraindications: []
    //     })
    // }

    ingridientsTumbler = () => {
        this.setState({ ingridientsBoth: !this.state.ingridientsBoth })
    }
    indicationsTumbler = () => {
        this.setState({ indicationsBoth: !this.state.indicationsBoth })
    }
    sideEffectsTumbler = () => {
        this.setState({ sideEffectsBoth: !this.state.sideEffectsBoth })
    }
    contraindicationsTumbler = () => {
        this.setState({ contraindicationsBoth: !this.state.contraindicationsBoth })
    }

    pushToFiltersHandleCountry = (e) => {
        console.log(e.target.value)
        if (this.state.filtersCountry.length > 0) {
            let index = this.state.filtersCountry.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({ filtersCountry: [...this.state.filtersCountry, e.target.value] }));
            } else {

                this.setState({
                    filtersCountry: this.state.filtersCountry.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({ filtersCountry: [...this.state.filtersCountry, e.target.value] }));
        }
    }
    pushToFiltersHandleCompany = (e) => {
        console.log(e.target.value)
        if (this.state.filtersCompany.length > 0) {
            let index = this.state.filtersCompany.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({ filtersCompany: [...this.state.filtersCompany, e.target.value] }));
            } else {

                this.setState({
                    filtersCompany: this.state.filtersCompany.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({ filtersCompany: [...this.state.filtersCompany, e.target.value] }));
        }
    }
    pushToFiltersHandleForm = (e) => {
        console.log(e.target.value)
        if (this.state.filtersForm.length > 0) {
            let index = this.state.filtersForm.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({ filtersForm: [...this.state.filtersForm, e.target.value] }));
            } else {

                this.setState({
                    filtersForm: this.state.filtersForm.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({ filtersForm: [...this.state.filtersForm, e.target.value] }));
        }
    }
    pushToFiltersHandleIngridients = (e) => {
        console.log(e.target.value)
        if (this.state.filtersIngridients.length > 0) {
            let index = this.state.filtersIngridients.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({ filtersIngridients: [...this.state.filtersIngridients, e.target.value] }));
            } else {

                this.setState({
                    filtersIngridients: this.state.filtersIngridients.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({ filtersIngridients: [...this.state.filtersIngridients, e.target.value] }));
        }
    }
    pushToFiltersHandleIndications = (e) => {
        console.log(e.target.value)
        if (this.state.filtersIndications.length > 0) {
            let index = this.state.filtersIndications.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({ filtersIndications: [...this.state.filtersIndications, e.target.value] }));
            } else {

                this.setState({
                    filtersIndications: this.state.filtersIndications.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({ filtersIndications: [...this.state.filtersIndications, e.target.value] }));
        }
    }
    pushToFiltersHandleSideEffects = (e) => {
        console.log(e.target.value)
        if (this.state.filtersSideEffects.length > 0) {
            let index = this.state.filtersSideEffects.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({ filtersSideEffects: [...this.state.filtersSideEffects, e.target.value] }));
            } else {

                this.setState({
                    filtersSideEffects: this.state.filtersSideEffects.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({ filtersSideEffects: [...this.state.filtersSideEffects, e.target.value] }));
        }
    }
    pushToFiltersHandleContraindications = (e) => {
        console.log(e.target.value)
        if (this.state.filtersContraindications.length > 0) {
            let index = this.state.filtersContraindications.find((name) => name === e.target.value);
            if (index !== e.target.value) {
                this.setState(prevState => ({ filtersContraindications: [...this.state.filtersContraindications, e.target.value] }));
            } else {

                this.setState({
                    filtersContraindications: this.state.filtersContraindications.filter(function (country) {
                        return country !== e.target.value
                    })
                });
            }
        } else {
            this.setState(prevState => ({ filtersContraindications: [...this.state.filtersContraindications, e.target.value] }));
        }
    }

    searchHandler = (e) => {
        this.setState({ filterName: e.target.value });
    }
    searchButtonHandler = () => {
        this.setState({ page: 1 });
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
            page: 1
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
                        response: result.medicaments,
                        pages: result.pages
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            );
    }
    modalShow = (e) => {
        this.setState({ modal_id: e.target.id });
        this.setState({ modal_show: true });
    }
    modalClose = () => {
        this.setState({ modal_show: false });
        this.setState({ modal_id: '' });
    }
    handleClose = () => this.setState({ show: !this.state.show });
    handleFiltersOffcanvasClose = () => {
        this.setState({ showFiltersOffcanvas: !this.state.showFiltersOffcanvas })
    }


    render() {
        const filtersArray = [{
            name: "Страна",
            func: this.pushToFiltersHandleCountry,
            filtersList: this.state.filtersCountryList,
            tumbler: "",
            filters: this.state.filtersCountry,
            tumblerValue: false
        },
        {
            name: "Компания",
            func: this.pushToFiltersHandleCompany,
            filtersList: this.state.filtersCompanyList,
            tumbler: "",
            filters: this.state.filtersCompany,
            tumblerValue: false
        },
        {
            name: "Форма",
            func: this.pushToFiltersHandleForm,
            filtersList: this.state.filtersFormList,
            tumbler: "",
            filters: this.state.filtersForm,
            tumblerValue: false
        },
        {
            name: "Состав",
            func: this.pushToFiltersHandleIngridients,
            filtersList: this.state.filtersIngridientsList,
            tumbler: this.ingridientsTumbler,
            filters: this.state.filtersIngridients,
            tumblerValue: this.state.ingridientsBoth
        },
        {
            name: "Показания",
            func: this.pushToFiltersHandleIndications,
            filtersList: this.state.filtersIndicationsList,
            tumbler: this.indicationsTumbler,
            filters: this.state.filtersIndications,
            tumblerValue: this.state.indicationsBoth
        },
        {
            name: "Побочные эффекты",
            func: this.pushToFiltersHandleSideEffects,
            filtersList: this.state.filtersSideEffectsList,
            tumbler: this.sideEffectsTumbler,
            filters: this.state.filtersSideEffects,
            tumblerValue: this.state.sideEffectsBoth
        },
        {
            name: "Противопоказания",
            func: this.pushToFiltersHandleContraindications,
            filtersList: this.state.filtersContraindicationsList,
            tumbler: this.contraindicationsTumbler,
            filters: this.state.filtersContraindications,
            tumblerValue: this.state.contraindicationsBoth
        },
        ];
        let page;
        if (this.state.isLoaded) {
            page =
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="box">
                            {
                                this.state.response.map(
                                    (bud, i) => (

                                        <TableElement className={bud.name}
                                            id={bud.id} name={bud.name} company={bud.company}
                                            country={bud.country}
                                            ingreds={bud.ingridients}
                                            img={"https://grozny-inform.ru/LoadedImages/2020/12/01/16a0864a1b0bbeed2ee249327d6f69d9.png"}
                                            funct={this.modalShow}></TableElement>

                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
        } else {
            page = <div>
                <Container>
                    <Row>
                        <Col>
                            <Spinner animation="border" role="status" style={{ width: "100px", height: "100px" }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>
            </div>
        }
        return (
            <div>
                <div className="container my-2">
                    <div id='top-elements'>
                        <input id='find-field' type="text" value={this.state.filterName}
                            onChange={this.searchHandler} />
                        <button id='find-button' onClick={this.searchButtonHandler}>
                            <span id='find-button-text'>Поиск</span>
                            <svg id='find-button-icon' xmlns="http://www.w3.org/2000/svg" height="32"
                                viewBox="0 96 960 960" width="32">
                                <path
                                    d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
                            </svg>
                        </button>
                        <button id='show-calendar' onClick={this.handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32">
                                <path
                                    d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm300 230q-17 0-28.5-11.5T440 616q0-17 11.5-28.5T480 576q17 0 28.5 11.5T520 616q0 17-11.5 28.5T480 656Zm-160 0q-17 0-28.5-11.5T280 616q0-17 11.5-28.5T320 576q17 0 28.5 11.5T360 616q0 17-11.5 28.5T320 656Zm320 0q-17 0-28.5-11.5T600 616q0-17 11.5-28.5T640 576q17 0 28.5 11.5T680 616q0 17-11.5 28.5T640 656ZM480 816q-17 0-28.5-11.5T440 776q0-17 11.5-28.5T480 736q17 0 28.5 11.5T520 776q0 17-11.5 28.5T480 816Zm-160 0q-17 0-28.5-11.5T280 776q0-17 11.5-28.5T320 736q17 0 28.5 11.5T360 776q0 17-11.5 28.5T320 816Zm320 0q-17 0-28.5-11.5T600 776q0-17 11.5-28.5T640 736q17 0 28.5 11.5T680 776q0 17-11.5 28.5T640 816Z" />
                            </svg>
                        </button>
                        <button id='show-filters' onClick={this.handleFiltersOffcanvasClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32">
                                <path
                                    d="M440 896q-17 0-28.5-11.5T400 856V616L161 311q-14-17-4-36t31-19h584q21 0 31 19t-4 36L560 616v240q0 17-11.5 28.5T520 896h-80Zm40-276 240-304H240l240 304Zm0 0Z" />
                            </svg>
                        </button>
                        <Offcanvas className={"offcanvas-size-xxl"} show={this.state.show}
                            onHide={this.handleClose}
                            placement={'bottom'}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Расписание</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Schedule />
                            </Offcanvas.Body>
                        </Offcanvas>

                        <Offcanvas className={"offcanvas-size-xxl"} show={this.state.showFiltersOffcanvas}
                            onHide={this.handleFiltersOffcanvasClose}
                            placement={'start'}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Фильтры</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body id='left-filters'>
                                <Accordion flush style={{ flex: "1" }}>
                                    {
                                        filtersArray.map(
                                            (name, j) => (
                                                <AccordionItem eventKey={'' + j}>
                                                    <AccordionHeader>{name.name}</AccordionHeader>
                                                    <AccordionBody>
                                                        <FilterComponent name={name.name} func={name.func}
                                                            filtersList={name.filtersList}
                                                            tumbler={name.tumbler} filters={name.filters}
                                                            tumblerValue={name.tumblerValue}></FilterComponent>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )
                                            )
                                        }
                                </Accordion>
                                <button id='drop-filters' className={'glow-btn-red'}>Сбросить фильтры</button>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
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
                        <button className='glow-btn-blue' onClick={() => this.setState({ modal_show: false })}>Закрыть</button>
                    </Modal.Footer>

                </Modal>
                <div id='finder'>
                    <div id='filter-menu'>
                        <button className={'glow-btn-red d-none d-md-inline'}>Сбросить фильтры</button>
                        <div className='offcanvas-md offcanvas-start' aria-labelledby='filtersLabel'>
                            <OffcanvasHeader closeButton>
                                <OffcanvasTitle style={{ fontSize: "large-xx" }}>Фильтры</OffcanvasTitle>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <Accordion flush style={{ flex: "1" }}>
                                    {
                                        filtersArray.map(
                                            (name, j) => (
                                                <AccordionItem eventKey={'' + j}>
                                                    <AccordionHeader>{name.name}</AccordionHeader>
                                                    <AccordionBody>
                                                        <FilterComponent name={name.name} func={name.func}
                                                            filtersList={name.filtersList}
                                                            tumbler={name.tumbler} filters={name.filters}
                                                            tumblerValue={name.tumblerValue}></FilterComponent>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )
                                        )
                                    }
                                </Accordion>
                            </OffcanvasBody>
                        </div>
                    </div>
                    <div>
                        {page}
                        <PaginationComponent currentPage={this.state.page} pages={this.state.pages}
                            function={this.changePageHandler}></PaginationComponent>
                    </div>
                </div>
                <ToastContainer position={"bottom-start"} containerPosition={"sticky"}>
                    {
                        this.state.toasts.good === 1 ?
                            this.state.toasts.toasts.map(
                                (id, i) => (
                                    <ToastAccepted name={id} show={true}></ToastAccepted>
                                )
                            ) :
                            this.state.toasts.toasts.map(
                                (id, i) => (
                                    <ToastDeclined name={id} show={true}></ToastDeclined>
                                )
                            )
                    }
                </ToastContainer>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);