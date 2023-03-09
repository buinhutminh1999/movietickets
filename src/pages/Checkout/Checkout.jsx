import { Col, Row, Button, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayDanhSachPhongVe } from '../../redux/action/movieAction'
export default function Checkout(props) {
  let { usLogin, detailMovies, roomTicket } = useSelector((state) => { return state.movieReducer })
  let [laySoGhe, setLaySoGhe] = useState()
  let [change, setChange] = useState([])
  let [mangGheDaChon, setMangGheDaChon] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    let action = LayDanhSachPhongVe(props.match.params.id)
    dispatch(action)
  }, [])

  let checkLoaiGhe = (item) => {
    let { loaiGhe, daDat } = item
    if (daDat) {
      return 'btn-secondary'
    } else {
      switch (loaiGhe) {
        case 'Vip':
          for (const value of mangGheDaChon) {
            if (value.maGhe == item.maGhe && value.daDat) {
              return 'btn-success'
            }
            if (value.maGhe == item.maGhe && !value.daDat) {
              return 'btn-danger'
            }

          }
          return 'btn-danger'
        default:
          if (loaiGhe === 'Thuong') {
            for (const value of mangGheDaChon) {
              if (value.maGhe == item.maGhe && value.daDat) {
                return 'btn-success'
              }
              if (value.maGhe == item.maGhe && !value.daDat) {
                return 'btn-info'
              }
            }
            return 'btn-info'
          }
      }
    }
  }

  let checkDisabled = (item) => {
    let { daDat } = item
    if (daDat) {
      return 'disabled'
    }
  }
  useEffect(() => {
    if (laySoGhe) {
      let arrGhe = [...mangGheDaChon]
      let obj = arrGhe.find((item) => {
        return item.maGhe == laySoGhe.maGhe
      })
      if (obj && obj.daDat) {// ghe sau khi duoc them
        obj.daDat = false
        setMangGheDaChon(arrGhe)
        setChange(arrGhe)
      } else if (obj && !obj.daDat) {
        obj.daDat = true
        setMangGheDaChon(arrGhe)
        setChange(arrGhe)
      } else {// ghe moi duoc them
        setMangGheDaChon([...mangGheDaChon, { ...laySoGhe, daDat: true }])
      }
    }
  }, [laySoGhe])

  useEffect(() => {
    if (change) {
      let newArr = change.filter((item) => {
        return item.daDat !== false
      })
      setMangGheDaChon(newArr)
    }

  }, [change])

  console.log('mangGheDaChon', mangGheDaChon)
  return (
    <div className='container'>
      <Row>

        <Col span={12}>
          <Space wrap >
            {roomTicket.danhSachGhe?.map((item) => {
              return <Button key={item.tenGhe} className={checkLoaiGhe(item)} disabled={checkDisabled(item)} onClick={() => {
                setLaySoGhe({ ...item })
                //khi click vào đây 

              }}>{item.tenGhe}</Button>
            })}
          </Space>

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
              <p>0</p>
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
              <p>0</p>
            </Col>
          </Row>
          <div className='movies__info'>
            <p>{usLogin?.email}</p>
            <p>{usLogin?.soDT}</p>
          </div>
          <Button className='primary' >Mua vé</Button>
        </Col>

      </Row >

    </div >
  )
}
