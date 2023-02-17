import React from 'react'
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { dangNhapAction } from '../../redux/action/movieAction';
import { useDispatch } from 'react-redux';


const Login = (value) => {
   
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const onFinish = (values) => {
     let action = dangNhapAction({taiKhoan: values.taiKhoan, matKhau: values.matKhau})
     dispatch(action)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
                            navigate('/register')
                        }}>Đăng ký</Button>
                    </Space>

                </Form.Item>
            </Form>
        </div>
    )
}
export default Login;