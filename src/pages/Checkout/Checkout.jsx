import { Col, Row, Button, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayDanhSachPhongVe } from '../../redux/action/movieAction'
import { style } from './checkout.css'
export default function Checkout(props) {
  let { usLogin, detailMovies, roomTicket } = useSelector((state) => { return state.movieReducer })
  let [laySoGhe, setLaySoGhe] = useState()
  let [tongTienVe, setTongTienVe] = useState()
  let [mangGheDaChon, setMangGheDaChon] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    let action = LayDanhSachPhongVe(props.match.params.id)
    dispatch(action)
  }, [])

  let checkLoaiGhe = (item) => {
    let { loaiGhe, daDat } = item


    // if (daDat) {
    //   return 'btn-secondary ghe'
    // } else {
    //   switch (loaiGhe) {
    //     case 'Vip':
    //       for (const value of mangGheDaChon) {
    //         if (value.maGhe == item.maGhe && value.daDat) {
    //           return 'btn-success'
    //         }
    //       }
    //       return 'btn-danger ghe'
    //     default:
    //       if (loaiGhe === 'Thuong') {
    //         for (const value of mangGheDaChon) {
    //           if (value.maGhe == item.maGhe && value.daDat) {
    //             return 'btn-success'
    //           }
    //         }
    //         return 'btn-info ghe'
    //       }
    //   }
    // }
  }
  let checkDisabled = (item) => {
    let { daDat } = item
    if (daDat) {
      return 'disabled'
    }
  }
  const renderDsGhe = () => {
    return roomTicket.danhSachGhe?.map((item, index) => {
      let daDat = item.daDat ? 'daDat' : ''
      let gheVip = item.loaiGhe == 'Vip' ? 'gheVip' : ''
      let gheThuong = item.loaiGhe == 'Thuong' ? 'gheThuong' : ''
      let daChon = ''
      for (const value of mangGheDaChon) {
          if(value.maGhe == item.maGhe && value.daDat){
            daChon = 'daChon'
          }
      }
      return <>
        <button key={item.tenGhe} className={`ghe ${gheVip} ${gheThuong} ${daChon} ${daDat}`} disabled={item.daDat} onClick={() => {
          setLaySoGhe({ ...item })//de useeffect update nhan biet co thay doi

        }}>{item.tenGhe}</button>
        {/* {(index + 1) % 16 == 0?  <br/> : ''} */}

      </>
    })
  }

  useEffect(() => {
    if (laySoGhe) {
      let obj = mangGheDaChon.find((item) => {
        return item.maGhe == laySoGhe.maGhe
      })
      if (obj) {// ghe sau khi duoc them, khi da ton tai loai ma ghe da chon ra khoi mang
        let arrNew = mangGheDaChon.filter(item2 => item2.maGhe !== laySoGhe.maGhe)// giong xoa ghe ra khoi mang
        setMangGheDaChon(arrNew)
      } else {// ghe moi duoc them
        setMangGheDaChon([...mangGheDaChon, { ...laySoGhe, daDat: true }])
      }
    }
  }, [laySoGhe])

  useEffect(() => {
    let total = mangGheDaChon.reduce((total, item) => {
      return total + item.giaVe
    }, 0)
    setTongTienVe(total)
  }, [mangGheDaChon])
  console.log('mangGheDaChon', mangGheDaChon)
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
              {mangGheDaChon.map((item) => {
                return <p key={item.maGhe}>{item.maGhe}</p>
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
              {tongTienVe}
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
