import React, { useEffect, useState } from 'react'
import { Button, Table, Input, Space } from 'antd';
import axios from 'axios';
import { TOKEN, URL_API } from '../../../ulti/setting';
import { AudioOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung } from '../../../redux/action/movieAction';
import { LoadingReducer } from '../../../redux/reducers/movieReducer';
const getAccessToken = localStorage.getItem('accessToken')

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    // specify the condition of filtering result
    // here is that finding the name started with `value`

    sorter: (a, b) => a.stt - b.stt,
    sortDirections: ['descend', 'ascend'],//có 2 loại sort
    defaultSortOrder: 'descend'
  },
  {
    title: 'Tài khoản',
    dataIndex: 'taiKhoan',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.moTa.length - b.moTa.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.moTa.length - b.moTa.length,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'sdt',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.moTa.length - b.moTa.length,
  },
  {
    title: 'Hành động',
    dataIndex: 'hanhDong',
  },
];
export default function TableNguoiDung(props) {
  const { danhSachNguoiDung } = useSelector(state => state.movieReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(layDanhSachNguoiDung())
  }, [])
  const xoaTaiKhoan = (taiKhoan) => {
    dispatch(LoadingReducer(true))

    let promise = axios({
      method: 'DELETE',
      url: `${URL_API}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      headers: {
        TokenCybersoft: TOKEN,
        Authorization: 'Bearer ' + getAccessToken,
      }
    })

    promise.then((result) => {
      dispatch(LoadingReducer(false))
      dispatch(layDanhSachNguoiDung())
      console.log(result)
    })
      .catch((err) => {
        dispatch(LoadingReducer(false))
        console.log(err)
      })
  }
  const renderDanhSachNguoiDung = () => {
    return danhSachNguoiDung.map((item, index) => {
      return {
        key: index + 1,
        stt: index + 1,
        taiKhoan: item.taiKhoan,
        hoTen: item.hoTen,
        email: item.email,
        sdt: item.soDT,

        hanhDong: <Space >
          <Button className='btn-success mr-2' onClick={() => {
            localStorage.setItem('CapNhatND', JSON.stringify(item))
            props.history.push(`/admin/quanlynguoidung/capnhatnguoidung/${item.taiKhoan}`)
          }}>Edit</Button>
          <Button className='btn-danger' onClick={() => {
            xoaTaiKhoan(item.taiKhoan)
          }}>Delete</Button>

        </Space>
      }
    })
  }



  const handleClickSearch = (e) => {
    dispatch(layDanhSachNguoiDung(e))
  }
  return (
    <div>
      <Button onClick={() => {
        props.history.push(`/admin/quanlynguoidung/themnguoidung`)
      }}>Thêm người dùng</Button>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleClickSearch}
      />
      <Table columns={columns} dataSource={renderDanhSachNguoiDung()} />
    </div>
  )
}
