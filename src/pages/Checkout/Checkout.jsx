import { Col, Row, Button, Alert, Space } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datVe, LayDanhSachPhongVe } from '../../redux/action/movieAction'
import { style } from './checkout.css'
import { useReducer } from 'react';
import _ from 'lodash';

export default function Checkout({ id ,handleSetKey}) {
  let { usLogin, detailMovies, roomTicket, postTickets } = useSelector((state) => { return state.movieReducer })
  let [tongTienVe, setTongTienVe] = useState()
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
      let daDat = item.daDat ? 'daDat' : ''
      let gheVip = item.loaiGhe == 'Vip' ? 'gheVip' : ''
      let gheThuong = item.loaiGhe == 'Thuong' ? 'gheThuong' : ''
      let banDaDat = usLogin.taiKhoan == item.taiKhoanNguoiDat ? 'taiKhoanBanDaDat' : ''
      let daChon = ''
      for (const value of mangGheDaChon) {
        if (value.maGhe == item.maGhe) {
          daChon = 'daChon'
        }
      }
      return <button key={item.tenGhe} className={`ghe ${gheVip} ${gheThuong} ${daChon} ${daDat} ${banDaDat}`} disabled={item.daDat} onClick={() => {
        chonGhe(item)
      }}>{item.tenGhe}</button>
      //  {(index + 1) % 16 == 0?  <br/> : ''}
    })
  }

  const danhSachGheDaDat = () => {
    return roomTicket.danhSachGhe?.map((item, index) => {
      if (!item.daDat) {
        return <p key={item.stt}>{item.stt}</p>
      }
      // {index % 2 == 0 ? <br/> : null}
    })
  }

  let total = useMemo(() => {
    console.log('useMemo')
    return mangGheDaChon.reduce((total, item) => {
      return total + item.giaVe
    }, 0).toLocaleString()

  }, [mangGheDaChon])


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
            let action = datVe({ maLichChieu, danhSachVe })
            dispatch(action)
            handleSetKey()
            
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
                <th>Ghế chưa đặt</th>
                <th>Ghế đang đặt</th>
                <th>Ghế Vip</th>
                <th>Ghế đã được đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{danhSachGheDaDat()}</td>

              </tr>
            </tbody>
          </table>
        </Col>
      </Row >

    </div >
  )
}
