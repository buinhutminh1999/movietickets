import { Col, Row, Button, Alert, Space } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datVe, LayDanhSachPhongVe } from '../../redux/action/movieAction'
import { style } from './checkout.css'
import _ from 'lodash';
import { UserOutlined } from '@ant-design/icons';

export default function Checkout({ id, handleSetKey }) {
  let { usLogin, roomTicket,  } = useSelector((state) => { return state.movieReducer })
  let [mangGheDaChon, setMangGheDaChon] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    let action = LayDanhSachPhongVe(id)
    dispatch(action)
  }, [])


  const chonGhe = (item) => {
    setMangGheDaChon((preState) => {
      let obj = preState.find((item2) => {
        return item.maGhe == item2.maGhe
      })
      if (obj) {// ghe sau khi duoc them, khi da ton tai loai ma ghe da chon ra khoi mang
        return preState.filter(item2 => item2.maGhe !== item.maGhe)// giong xoa ghe ra khoi mang\
      } else {// ghe moi duoc them
        return [...preState, { maGhe: item.maGhe, giaVe: item.giaVe }]
      }
    })

  }
  const renderDsGhe = () => {
    return roomTicket.danhSachGhe?.map((item, index) => {
      let banDaDat = usLogin.taiKhoan == item.taiKhoanNguoiDat ? 'taiKhoanBanDaDat' : ''

      let daDat = item.daDat ? 'daDat' : ''
      let gheVip = item.loaiGhe == 'Vip' ? 'gheVip' : ''
      let gheThuong = item.loaiGhe == 'Thuong' ? 'gheThuong' : ''
      let daChon = ''
      for (const value of mangGheDaChon) {
        if (value.maGhe == item.maGhe) {
          daChon = 'daChon'
        }
      }
      return <button key={item.tenGhe} className={`ghe  ${banDaDat} ${gheVip} ${gheThuong} ${daChon} ${daDat}`} disabled={item.daDat} onClick={() => {
        chonGhe(item)
      }}>{usLogin.taiKhoan == item.taiKhoanNguoiDat ? <UserOutlined /> : item.tenGhe}</button>
      //  {(index + 1) % 16 == 0?  <br/> : ''}
    })
  }

  let total = useMemo(() => {
    console.log('useMemo')
    return mangGheDaChon.reduce((total, item) => {
      return total + item.giaVe
    }, 0).toLocaleString()

  }, [mangGheDaChon])


  useEffect(() => {// khi api trả về dữ liệu thay đỏi thì set lại state
    if (mangGheDaChon.length > 0) {
      setMangGheDaChon([])
      handleSetKey()
    }
  }, [roomTicket])

  // console.log('postTickets',postTickets)

  return (
    <div className='container-fluid'>

      <Row>
        <Col span={12}>
          {renderDsGhe()}
        </Col>
        <Col span={12}>
          <div className='movies__name'>
            <h3>{roomTicket.thongTinPhim?.tenPhim}</h3>
          </div>
          <hr />

          <div className='movies_address'>
            <p>{roomTicket.thongTinPhim?.tenCumRap}</p>
          </div>

          <Row className='movies__seats'>
            <Col span={12}>
              <p>Chỗ ngồi</p>
            </Col>

            <Col span={12}>
              {_.sortBy(mangGheDaChon, ['maGhe']).map((item) => {
                return <span key={item.maGhe}>{item.maGhe} </span>
              })}
            </Col>
          </Row>
          <div className='movies__date'>
            <p>{`Ngày chiếu: ${roomTicket.thongTinPhim?.ngayChieu} - ${roomTicket.thongTinPhim?.gioChieu}`}</p>
          </div>

          <Row className="movies__total">
            <Col span={12}>
              <p>Tạm tính</p>
            </Col>
            <Col span={12}>
              {total}
            </Col>
          </Row>
          <div className='movies__info'>
            <p>{usLogin?.email}</p>
            <p>{usLogin?.soDT}</p>
          </div>
          <button className='primary btn__muave' disabled={mangGheDaChon.length == 0 ? true : false} onClick={() => {
            let maLichChieu = id
            let danhSachVe = mangGheDaChon
            //khi bấm đặt vé load lại ghế trên api, for qua danhSachGhe.soGhe == api.soGhe && soGhe == taiKhoan : daDatThanhCong : da có ng đặt
            let action = datVe({ maLichChieu, danhSachVe })
            dispatch(action)

          }}>Mua vé</button>
          <Space
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            {/* {postTickets == '' ? null : <Alert message={postTickets !== ? 'Mua vé thành công' : ''} type="success" /> } */}
          </Space>
        </Col>
        <Col span={24}>
          <table className='table'>
            <thead>
              <tr>
                <th>Ghế thường</th>
                <th>Ghế bạn chọn</th>
                <th>Ghế Vip</th>
                <th>Ghế khách đã đặt</th>
                <th>Ghế bạn đã đặt</th>
                <th>Ghế khách đang đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><button className={`ghe gheThuong`}></button></td>
                <td><button className={`ghe daChon`}></button></td>
                <td><button className={`ghe gheVip`}></button></td>
                <td><button className={`ghe daDat`}></button></td>
                <td><button className={`ghe taiKhoanBanDaDat`}><UserOutlined /></button></td>
                <td><button className={`ghe khachDangDat`}></button></td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row >

    </div >
  )
}
