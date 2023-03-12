import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"
export const CheckoutTemplate = (props) => {
    let { usLogin } = useSelector(state => state.movieReducer)
    if (usLogin == null) {
        return <Redirect to={'/login'} />
    } else {
        return <Route exact path={props.path} render={(propsRoute) => {
            return <>
                <props.component {...propsRoute} />
            </>
        }} />
    }

}

