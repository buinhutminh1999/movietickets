import { useEffect } from "react"
import { Route } from "react-router-dom"
import Footer from "../component/Footer/Footer"
import Header from "../component/Header/Header"

export const BodyTemplate = ({
  comp: Component, // use comp prop
  ...rest
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);// giúp scroll lên đầu trang
  })
  return <Route {...rest} exact path={rest.path} render={(propsRoute) => {
    return <>
      <Header {...propsRoute} />
      <Component {...propsRoute} />
      <Footer />
    </>
  }} />
}

