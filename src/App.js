import logo from './logo.svg';
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
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history} >
      <Switch>
        <SingleTemplate path="/login" component={Login} />
        <SingleTemplate path="/register" component={Register} />
        <BodyTemplate  path="/detail-movies" component={DetailMovies}/>
        <CustomerTemplate path="/home"  />
        <CustomerTemplate path="/"  />
      </Switch>
    </Router>
  );
}

export default App;
