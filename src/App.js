import './App.css';
import { Switch, Router, BrowserRouter, Route } from "react-router-dom";
// import { RouterPath } from './Routers/RouterPath';
import { CustomerTemplate } from './Template/CustomerTemplate'
import 'antd/dist/reset.css';
import { createBrowserHistory } from "history";
import Login from './pages/Login/Login';
import { SingleTemplate } from './Template/SingleTemplate';
import Register from './pages/register/Register';
import DetailMovies from './pages/DetailMovies/DetailMovies';
import { BodyTemplate } from './Template/BodyTemplate';
import { CheckoutTemplate } from './Template/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
// import { Suspense, lazy } from 'react';
export const history = createBrowserHistory();
// const CheckoutTemplateLazy = lazy(() => import('./Template/CheckoutTemplate/CheckoutTemplate'));
function App() {
  return (
    <Router history={history} >
      <Switch>
        <SingleTemplate path="/login" component={Login} />
        <SingleTemplate path="/register" component={Register} />
        <BodyTemplate path="/detail/:id" component={DetailMovies} />
        <CheckoutTemplate path="/checkout/:id" component={Checkout} />
        {/* <Suspense fallback={<div>h1 loading.....</div>}>
          <CheckoutTemplateLazy path="/checkout/:id" component={Checkout} />
        </Suspense> */}
        <CustomerTemplate path="/home" />
        <CustomerTemplate path="/" />
      </Switch>
    </Router>
  );
}

export default App;
