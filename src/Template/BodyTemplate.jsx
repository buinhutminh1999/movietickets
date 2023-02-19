import { Route } from "react-router-dom"
import Footer from "../component/Footer/Footer"
import Header from "../component/Header/Header"

export const BodyTemplate = (props) => {
    return <Route exact path={props.path} render={(propsRoute) => {
      return <>
        <Header {...propsRoute} />
        <props.component {...propsRoute} />
        <Footer />
      </>
    }} />
  }

  