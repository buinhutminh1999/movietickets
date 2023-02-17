import logo from './logo.svg';
import './App.css';
import AdminTemplate from './component/Header/Header';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { RouterPath } from './Routers/RouterPath';
import 'antd/dist/reset.css';
const router = RouterPath()
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
