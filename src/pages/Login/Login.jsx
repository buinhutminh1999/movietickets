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
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>

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
    )
}
