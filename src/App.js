import './App.css';
import Main from './components/main'
import Graph from "./components/graph.component";
import Schedule from "./components/schedule/schedule";
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
            path: "/:id",
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
