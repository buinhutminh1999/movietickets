import React, { useState } from 'react'
import {
  Button,
  Form,
  Input,
  Select
} from 'antd';
import { useDispatch } from 'react-redux';
import { capNhatThongTinNguoiDungAdmin } from '../../../redux/action/movieAction'
const thongTinNguoiDung = JSON.parse(localStorage.getItem('CapNhatND'))
export default function CapNhatNguoiDung() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    taiKhoan: thongTinNguoiDung.taiKhoan,
    matKhau: thongTinNguoiDung.matKhau,
    email: thongTinNguoiDung.email,
    soDt: thongTinNguoiDung.soDT,
    maNhom: 'GP01',
    maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
    hoTen: thongTinNguoiDung.hoTen,
  })
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleChangeSelect = (e) => {
    setUser({ ...user, maLoaiNguoiDung: e })
  }

  const handleOnSubmit = () => {
    dispatch(capNhatThongTinNguoiDungAdmin(user))
  }
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

        style={{
          maxWidth: 600,
        }}
        onFinish={handleOnSubmit}

      >
        <Form.Item label="Tài khoản">
          <Input defaultValue={user.taiKhoan} name='taiKhoan' onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input defaultValue={user.matKhau} name='matKhau' onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input defaultValue={user.hoTen} name='hoTen' onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input defaultValue={user.email} name='email' onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input defaultValue={user.soDt} name='soDt' onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Select">
          <Select onChange={handleChangeSelect} defaultValue={{ value: user.maLoaiNguoiDung }}>
            <Select.Option value="KhachHang">Khách hàng</Select.Option>
            <Select.Option value="QuanTri">Quản trị</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select">
          <Button htmlType='submit'>Cập nhật thông tin người dùng</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
