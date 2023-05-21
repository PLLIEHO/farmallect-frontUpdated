import {combineReducers} from "redux";
import TableReducer from "./table";
import Counter from "./counter";

const allReducers = combineReducers({
    table: TableReducer,
    counter: Counter
});

export default allReducers;