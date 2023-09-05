import { useEffect, useRef } from "react";
import { Route } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../pages/Header/Header";

export const BodyTemplate = ({
  comp: Component, // use comp prop
  ...rest
}) => {
  const componentRef = useRef(null); // tạo ref


  useEffect(() => {
    window.scrollTo(0, 0); // giúp scroll lên đầu trang
  });
  return (
    <Route
      {...rest}
      exact
      path={rest.path}
      render={(propsRoute) => {
        return (
          <>
            <Header {...propsRoute} />
            <Component {...propsRoute} ref={componentRef} />
            <Footer />
          </>
        );
      }}
    />
  );
};
