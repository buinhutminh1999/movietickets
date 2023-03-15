import React, { Component, useEffect } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SubMenu from 'antd/es/menu/SubMenu';

const { Header, Content, Sider } = Layout;


export const AdminTemplate = ({
    comp: Component, // use comp prop
    ...rest
}) => {
    const { usLogin } = useSelector(state => state.movieReducer)
    const {
        token: { colorBgContainer },

    } = theme.useToken();
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
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <UserOutlined />,
                                    label: <NavLink to={"/admin/flim/addnew"}>Thêm Phim</NavLink>,
                                },
                                {
                                    key: '2',
                                    icon: '',
                                    label: <NavLink to={'/admin/flim'}>Flim</NavLink>,
                                },
                                {
                                    key: '3',
                                    icon: '<UploadOutlined />',
                                    label: 'nav 3',
                                },
                            ]}
                        />
                      
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                            }}

                        >
                            <div>
                                <Component {...propsRoute} />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>

    }} />
}
