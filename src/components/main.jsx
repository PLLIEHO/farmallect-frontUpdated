import React from 'react';
import "./resources/styles.scss";
import {bindActionCreators} from "redux";
import {add} from "../actions/actions";
import {connect} from "react-redux";
import Diogram from "./diogram";
import {ReactFlowProvider} from "@xyflow/react";


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
        }
    }


    render() {
        return (
            <div>
                <ReactFlowProvider>
                <Diogram/>
                    </ReactFlowProvider>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);