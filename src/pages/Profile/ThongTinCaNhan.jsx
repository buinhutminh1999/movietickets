import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { TOKEN, URL_API } from '../../ulti/setting';
import { capNhatThongTinNguoiDung } from '../../redux/action/movieAction'
const taiKhoan = JSON.parse(localStorage.getItem('userMovies'))

export default function ThongTinCaNhan() {
    const [componentDisabled, setComponentDisabled] = useState(true)
    let { usLogin } = useSelector(state => state.movieReducer)
    const [info, setInfo] = useState({})
    const dispatch = useDispatch()

    const layThongTinNguoiDung = () => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan.taiKhoan}`,
            headers: {
                TokenCybersoft: TOKEN,
            }
        })
        promise
            .then((result) => {
                setInfo({
                    taiKhoan: result.data.content[0].taiKhoan,
                    matKhau: result.data.content[0].matKhau,
                    email: result.data.content[0].email,
                    soDt: result.data.content[0].soDT,
                    maNhom: 'GP01',
                    maLoaiNguoiDung: result.data.content[0].maLoaiNguoiDung,
                    hoTen: result.data.content[0].hoTen,
                })
            })
            .catch((err) => { console.log(err) })
    }
    useEffect(() => {
        layThongTinNguoiDung()
    }, [])

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = () => {
        console.log(info)
        dispatch(capNhatThongTinNguoiDung(info))
        setComponentDisabled(true)
        localStorage.setItem('userMovies', JSON.stringify({ ...taiKhoan, email: info.email, hoTen: info.hoTen, soDT: info.soDt }))
    }
    console.log(info)
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
            // onFinish={handleOnSubmit}

            >
                <Form.Item label="Email">
                    <Input value={info.email} name='email' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input value={info.hoTen} name='hoTen' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input value={info.soDt} name='soDt' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Tài khoản">
                    <Input value={info.taiKhoan} disabled={componentDisabled ? true : true} name='taiKhoan' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input value={info.matKhau} name='matKhau' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Action">
                    {componentDisabled ? <Button type='button' disabled={componentDisabled ? false : undefined} onClick={() => {
                        setComponentDisabled(false)
                    }}>Chỉnh sửa thông tin tài khoản</Button>
                        : <Button type='submit' onClick={handleOnSubmit}>Cập nhật thông tin tài khoản</Button>}
                </Form.Item>
            </Form>


        </div>

    )
}
