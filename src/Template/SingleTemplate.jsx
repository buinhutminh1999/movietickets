import { Route } from "react-router-dom"

export const SingleTemplate = (props) => {
    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <props.component {...propsRoute} />
        </>
    }} />
}
