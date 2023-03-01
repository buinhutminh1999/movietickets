import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { dangNhapAction } from '../../redux/action/movieAction';
import { useDispatch, useSelector } from 'react-redux';


export default function Login(props, value) {
    let dispatch = useDispatch()
    let { loginErr } = useSelector(state => state.movieReducer)
    const onFinish = (values) => {
        let action = dangNhapAction({ taiKhoan: values.taiKhoan, matKhau: values.matKhau })
        dispatch(action)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // useEffect(() => {

    // }, [value])
    console.log(value)
    return (

        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5" style={{ marginTop: '70px' }}>
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 pdr-30">
                                        <h2 style={{ paddingLeft: '125px', marginBottom:'30px', fontWeight:'bold', fontSize:'39px' }}>Đăng Nhập</h2>
                                        <Form
                                            name="basic"
                                            labelCol={{
                                                span: 8,
                                            }}
                                            wrapperCol={{
                                                span: 16,
                                            }}
                                            style={{
                                                maxWidth: 600,
                                            }}
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
                                            {loginErr !== null ? <p className='alert alert-danger'>{loginErr}</p> : null}
                                            <Form.Item
                                                label="Tài khoản"
                                                name="taiKhoan"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập tài khoản!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Mật khẩu"
                                                name="matKhau"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                name="remember"
                                                valuePropName="checked"
                                                wrapperCol={{
                                                    offset: 8,
                                                    span: 16,
                                                }}
                                            >
                                                <Checkbox>Remember me</Checkbox>
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 8,
                                                    span: 16,
                                                }}
                                            >
                                                <Space wrap>
                                                    <Button type="primary" htmlType="submit">
                                                        Đăng nhập
                                                    </Button>
                                                    <Button type="primary" onClick={() => {
                                                        props.history.push('/register')
                                                    }}>Đăng ký</Button>
                                                </Space>

                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://storage.googleapis.com/afs-prod/media/e53811360eed4b8ba26b5f635d703a7c/3000.jpeg" style={{ width: '450px' }} alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
