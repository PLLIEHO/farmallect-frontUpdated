import './App.css';
import Main from './components/main'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createStore} from "redux";
import allReducers from "./reducers";
import {Provider} from "react-redux";
import NotFound from "./notfound.component";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main/>,
        },
        {
            path: "*",
            element: <NotFound/>
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
