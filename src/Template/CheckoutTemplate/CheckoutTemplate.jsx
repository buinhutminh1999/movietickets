import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import Login from "../../pages/Login/Login"


export const CheckoutTemplate = (props) => {
   let {usLogin} =  useSelector(state => state.movieReducer)

    if (!localStorage.getItem('userMovies')) {
        return <Redirect to={'/login'} />
    } else {
        return <Route exact path={props.path} render={(propsRoute) => {
            return <>
                {console.log('aaaa')}
                <props.component {...propsRoute} />
            </>
        }} />
    }

}

