import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './main'
import Graph from "./graph.component";
import Schedule from "./schedule";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createStore} from "redux";
import allReducers from "./reducers";
import {Provider} from "react-redux";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main/>,
        },
        {
            path: "medicine/:id",
            element: <Graph/>
        }
    ],
    {
        basename: process.env.PUBLIC_URL
    });

const store = createStore(allReducers);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </div>
    );
}

export default App;
