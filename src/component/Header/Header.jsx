import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/reducers/movieReducer';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, message } from 'antd';
import axios from 'axios';
import { TOKEN, URL_API } from '../../ulti/setting';

let items = []
export default function Header(props) {
    let activeStyle = 'nav-link text-danger'
    let nonActiveStyle = 'nav-link text-dark'
    let { usLogin } = useSelector((state) => { return state.movieReducer })
    const [statusLogin, setStatusLogin] = useState([])
    let dispatch = useDispatch()
    const kiemTraQuanTriHayKhachHang = () => {
        if (!usLogin) return;
        return usLogin.maLoaiNguoiDung == 'QuanTri'
            ? items = [
                {
                    label: 'Thông tin cá nhân',
                    key: '0',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Trang quản trị',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Đăng xuất',
                    key: '2',
                    icon: '',
                },
            ]
            : items = [
                {
                    label: 'Thông tin cá nhân',
                    key: '0',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Đăng xuất',
                    key: '2',
                    icon: '',
                },
            ]
    }

    const layThongTinNguoiDung = () => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${usLogin?.taiKhoan}`,
            headers: {
                TokenCybersoft: TOKEN,
            }
        })
        promise
            .then(result => {
               result.data.content.length !== 0 && usLogin !== null ? setStatusLogin(result.data.content) : setStatusLogin([])
            })
            .catch((err) => { console.log(err) })
    }
    useEffect(() => {
        layThongTinNguoiDung()
    }, [])


    let resetLocal = () => {
        localStorage.removeItem('userMovies')
        localStorage.removeItem('accessToken')
        dispatch(Logout(null))
    }
    const handleMenuClick = (e) => {
        if (e.key == '0') {
            console.log(e.key)
            props.history.push('/profile')
        } else if (e.key == '2') {
            message.info('Đăng xuất thành công');
            resetLocal()
        } else {
            props.history.push('/admin/flim')
        }
    };
    const menuProps = {
        items: kiemTraQuanTriHayKhachHang(),
        onClick: handleMenuClick,
    }

    let checkShowOrHideLogin = () => {
        return statusLogin.length !== 0 ? <Dropdown.Button menu={menuProps} placement="bottom" className='justify-content-end' icon={<UserOutlined />}>
            <span onClick={() => {
                props.history.push('/profile')
            }}>{usLogin.taiKhoan}</span>
        </Dropdown.Button > : <Space wrap>
            <button className='btn btn-info' onClick={() => {
                props.history.push('/login')
            }}>Đăng nhập</button>
            <button className='btn btn-secondary' onClick={() => {
                props.history.push('/register')
            }}>Đăng Ký</button>
        </Space>
    }

    return (
        <header className='header'>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-light pdlr-100">
                <a className="navbar-brand text-dark">Movie Tickets</a>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <NavLink to='/home' className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }>Home</NavLink>
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


