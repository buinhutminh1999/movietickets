import './App.css';
import { Switch, Router } from "react-router-dom";
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
import MenuCheckOut from './pages/Checkout/MenuCheckOut';
import Loading from './component/Loading/Loading';
import { AdminTemplate } from './Template/AdminTemplate/AdminTemplate';
import  Flim from './pages/Admin/Flim/Flim';
import AddFlim from './pages/Admin/AddFlim/AddFlim';
import Edit from './pages/Admin/Edit/Edit';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import Profile from './pages/Profile/Profile';
import ThemNguoiDung from './pages/Admin/ThemNguoiDung/ThemNguoiDung';
import TableNguoiDung from './pages/Admin/TableNguoiDung/TableNguoiDung';
import CapNhatNguoiDung from './pages/Admin/CapNhatNguoiDung/CapNhatNguoiDung';

// import { Suspense, lazy } from 'react';
export const history = createBrowserHistory();
// const CheckoutTemplateLazy = lazy(() => import('./Template/CheckoutTemplate/CheckoutTemplate'));
function App() {
  return (
    <Router history={history} >
      <Loading />
      <Switch>
        <SingleTemplate path="/login" component={Login} />
        <SingleTemplate path="/register" component={Register} />
        <BodyTemplate path="/profile" comp={Profile} />
        <BodyTemplate path="/detail/:id" comp={DetailMovies} />
        <CheckoutTemplate path="/checkout/:id" component={MenuCheckOut} />
        <AdminTemplate path="/admin/quanlynguoidung/capnhatnguoidung/:taiKhoan" comp={CapNhatNguoiDung} />
        <AdminTemplate path="/admin/quanlynguoidung/themnguoidung" comp={ThemNguoiDung} />
        <AdminTemplate path="/admin/quanlynguoidung" comp={TableNguoiDung} />

        <AdminTemplate path="/admin/flim/addnew" comp={AddFlim} />
        <AdminTemplate path="/admin/flim/edit/:id" comp={Edit} />
        <AdminTemplate path="/admin/flim/showtime/:id/:tenPhim" comp={ShowTime} />

        <AdminTemplate path="/admin/flim" comp={Flim} />
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
