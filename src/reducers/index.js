import {combineReducers} from "redux";
import TableReducer from "./table";

const allReducers = combineReducers({
    table: TableReducer,
});

export default allReducers;