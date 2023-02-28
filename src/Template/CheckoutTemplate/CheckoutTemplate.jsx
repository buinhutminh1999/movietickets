import { Redirect, Route } from "react-router-dom"
import Login from "../../pages/Login/Login"


 export const CheckoutTemplate = (props) => {
    if (!localStorage.getItem('userMovies')) {
        return <Redirect to={'/login'} />
    }

    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <props.component {...propsRoute} />
        </>
    }} />
}

