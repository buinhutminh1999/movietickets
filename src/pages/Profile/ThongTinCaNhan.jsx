import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons';
import {
    Space,
    Button,
    Form,
    Input,

} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { TOKEN, URL_API } from '../../ulti/setting';
import { useFormik } from 'formik';

export default function ThongTinCaNhan() {
    const [componentDisabled, setComponentDisabled] = useState(true)
    let { usLogin } = useSelector(state => state.movieReducer)
    const [info, setInfo] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${usLogin.taiKhoan}`,
            headers: {
                TokenCybersoft: TOKEN,
            }
        })
        promise
            .then((result) => {

                setInfo(result.data.content)

            })
            .catch((err) => { console.log(err) })

    }, [])
    const formik = useFormik(
        {
            initialValues: {
                taiKhoan: '',
                email:'',
                matKhau:'',
                sdt: '',
                
            }
        }
    )
    return (
        <div>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
            >

                <Form.Item label="Tài khoản">
                    <Input value={usLogin.taiKhoan} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input value={usLogin.email} />
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input value={usLogin.hoTen} />
                </Form.Item>
                <Form.Item label="Tài khoản">
                    <Input value={usLogin.taiKhoan} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input value={info[0]?.matKhau} />
                </Form.Item>

            </Form>
            <Form.Item label="Mật khẩu">
                {componentDisabled ? <Button onClick={() => {
                    setComponentDisabled(false)
                }}>Chỉnh sửa thông tin tài khoản</Button>
                    : <Button onClick={() => {

                    }}>Cập nhật thông tin tài khoản</Button>}
            </Form.Item>

        </div>

    )
}
