import React, { Component, useEffect, useState } from 'react'
import {  Layout, theme, Space } from 'antd';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/reducers/movieReducer';
const { Header, Content, Sider } = Layout;
const menu = [
    { id: 0, nameBtn: 'Danh sách phim', path: '/admin/flim' },
    { id: 1, nameBtn: 'Thêm Flim', path: '/admin/flim/addnew' },
    { id: 2, nameBtn: 'Quản lý người dùng', path: '/admin/quanlynguoidung' },
]

export const AdminTemplate = ({
    comp: Component, // use comp prop
    ...rest

}) => {
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
        return <Space wrap>
            <NavLink className='alert alert-success' to={'/profile'}>{usLogin.taiKhoan}</NavLink>
            <button className='btn btn-danger' onClick={resetLocal}>Đăng xuất</button>
        </Space>
    }

    const handleActive = (key) => {
        setActive(key)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    // || usLogin.maLoaiNguoiDung !== 'QuanTri'
    if (!usLogin ) {
        return <Redirect to={'/'} />
    }
    console.log(usLogin)
    return <Route {...rest} exact path={rest.path} render={(propsRoute) => {
        return <>
            <Layout style={{ minHeight: '100vh' }}>
                <Header className="header d-flex justify-content-end">
                    {checkShowOrHideLogin()}
                </Header>
                <Layout>
                    <Sider  >
                        <div className="logo" />
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
