import {createBrowserRouter} from "react-router-dom";
import Carousel from "../pages/carousel/Carousel";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";

import CustomerTemplate from "../Template/CustomerTemplate";

export const RouterPath = (props) => {
    return createBrowserRouter([
        {
            path: '/',
            element: <CustomerTemplate/>,
        },
        {
            path: '/home',
            element: <CustomerTemplate/>,
        },
        {
            path: '/about',
            element: <CustomerTemplate component={null}/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        {
            path: '/register',
            element: <Register/>,
        }
    ]);
}
