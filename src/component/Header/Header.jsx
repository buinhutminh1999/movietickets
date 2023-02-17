import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
// import * as React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
export default function Header(props) {
    let navigate = useNavigate();
    let activeStyle = 'nav-link text-danger'
    let nonActiveStyle = 'nav-link'
   let {usLogin} = useSelector((state) => {return state.movieReducer })
   console.log(usLogin)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand">Navbar</a>
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
                {/* <Space wrap>
                    {usLogin == '' ? '' : usLogin}
                </Space> */}

            </nav>
        </>
    )
}
