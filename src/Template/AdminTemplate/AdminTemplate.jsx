import React, { Component, useCallback, useEffect, useState } from 'react'
import { Layout, theme, Space, Dropdown, message } from 'antd';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/reducers/movieReducer';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import { history } from '../../App';
const { Header, Content, Sider } = Layout;
const menu = [
    { id: 0, nameBtn: 'Danh sách phim', path: '/admin/flim' },
    { id: 1, nameBtn: 'Thêm Flim', path: '/admin/flim/addnew' },
    { id: 2, nameBtn: 'Quản lý người dùng', path: '/admin/quanlynguoidung' },
]
let items = [
    {
        label: 'Thông tin cá nhân',
        key: '0',
        icon: <UserOutlined />,
    },
    {
        label: 'Đăng xuất',
        key: '1',
        icon: '',
    },
]

export const AdminTemplate = ({
    comp: Component,
    // use comp prop
    ...rest

}) => {
    const handleMenuClick = (e) => {
        if (e.key == '0') {
            history.push('/profile')
        } else if (e.key == '1') {
            history.push('/home')
            message.info('Đăng xuất thành công');
            resetLocal()
        }
    };
    const menuProps = {
        items: items,
        onClick: handleMenuClick,
    }
    const dispatch = useDispatch()
    const { usLogin } = useSelector(state => state.movieReducer)
    const {
        token: { colorBgContainer },

    } = theme.useToken();
    const [active, setActive] = useState(() => {
        if (rest.path == '/admin/flim') {
            return 0
        } else if (rest.path == '/admin/flim/addnew') {
            return 1
        }
        return 2
    })

    let resetLocal = () => {
        localStorage.removeItem('userMovies')
        localStorage.removeItem('accessToken')
        dispatch(Logout(null))
    }

    let checkShowOrHideLogin = () => {
        return <Dropdown.Button menu={menuProps} placement="bottom" className='justify-content-end' icon={<UserOutlined />}>
            <span onClick={() => {
                history.push('/profile')
            }}>{usLogin.taiKhoan}</span>
        </Dropdown.Button >

    }

    const handleActive = useCallback(key => setActive(key), [])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    if (!usLogin || usLogin.maLoaiNguoiDung !== 'QuanTri') {
        return <Redirect to={'/'} />
    }

    return <Route {...rest} exact path={rest.path} render={(propsRoute) => {
        return <>
            <Layout style={{ minHeight: '100vh' }}>
                <Header className="header d-flex justify-content-end align-items-center">
                    <span className="navbar-brand text-white" style={{ cursor: 'pointer' }} onClick={() => {
                        history.push('/home')
                    }}>Movie Tickets</span>

                    {checkShowOrHideLogin()}
                </Header>
                <Layout>
                    <Sider  >
                        <div className="logo" />
                        <span className="navbar-brand text-white" style={{ cursor: 'pointer' }} onClick={() => {
                            history.push('/home')
                        }}><HomeOutlined />Trở về trang chủ</span>
                        {menu.map((item) => {
                            let activeBnt = active == item.id ? 'btn-danger' : 'btn-success'
                            return <div className='m-3' key={item.id}>
                                <button className={`btn ${activeBnt}`} onClick={() => {
                                    setActive(item.id)
                                    propsRoute.history.push(`${item.path}`)
                                }}>{item.nameBtn}</button>
                            </div>
                        })}
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >

                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                            }}

                        >
                            <div>
                                <Component handleActive={handleActive} {...propsRoute} />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>

    }} />
}
