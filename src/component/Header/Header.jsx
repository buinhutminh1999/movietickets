import React from 'react'
import { Space } from 'antd';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/reducers/movieReducer';
export default function Header(props) {

    let activeStyle = 'nav-link text-danger'
    let nonActiveStyle = 'nav-link'
    let { usLogin } = useSelector((state) => { return state.movieReducer })
    let dispatch = useDispatch()

    let resetLocal = () => {
        localStorage.removeItem('userMovies')
        localStorage.removeItem('accessToken')
        dispatch(Logout(null))
    }

    let checkShowOrHideLogin = () => {
        return usLogin == null ?
            <Space wrap>
                <button className='btn btn-info' onClick={() => {
                    props.history.push('/login')
                }}>Đăng nhập</button>
                <button className='btn btn-secondary' onClick={() => {
                    props.history.push('/register')
                }}>Đăng Ký</button>
            </Space>
            : <Space wrap>
                <span className='alert alert-success'>{usLogin.taiKhoan}</span>
                <button className='btn btn-danger' onClick={resetLocal}>Đăng xuất</button>
            </Space>
    }
    console.log('usLogin', usLogin)
    return (
        <header className='header'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark pdlr-100">
                <a className="navbar-brand">Movie Tickets</a>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to='/home' className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/about' className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }>About</NavLink>
                        </li>
                    </ul>

                </div>
                {
                    checkShowOrHideLogin()
                }
            </nav>
        </header>
    )
}


