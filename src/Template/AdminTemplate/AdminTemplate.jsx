import React, { Component, useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
const { Header, Content, Sider } = Layout;
const menu = [
    { id: 0, nameBtn: 'Danh sách phim', path: '/admin/flim' },
    { id: 1, nameBtn: 'Thêm Flim', path: '/admin/flim/addnew' },
    { id: 2, nameBtn: 'Thêm người dùng', path: '/admin/flim/quanlynguoidung' },
]

export const AdminTemplate = ({
    comp: Component, // use comp prop
    ...rest
}) => {
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

    const handleActive = (key) => {
        setActive(key)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    if (!usLogin) {
        return <Redirect to={'/'} />
    }

    return <Route {...rest} exact path={rest.path} render={(propsRoute) => {
        return <>
            <Layout style={{ minHeight: '100vh' }}>
                <Header className="header">
                    <div className="logo" />
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
