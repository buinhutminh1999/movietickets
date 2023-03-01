import { Col, Row, Button } from 'antd'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
const detailFlim = JSON.parse(localStorage.getItem('DetailFlim'))
export default function Checkout(props) {
  let { usLogin, detailMovies } = useSelector(state => state.movieReducer)
  console.log('detailFlim', detailFlim.tenPhim)
  return (
    <div className='container'>
      <Row>
        <Col span={12}>

        </Col>
        <Col span={12}>
          <div className='movies__name'>
            <h3>{detailFlim?.tenPhim}</h3>
          </div>
          <hr />

          <div className='movies_address'>
            <p>Dia diem</p>
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
            <p>{moment(detailMovies.ngayChieu).format('hh:MM A - DD/MM/YYYY')}</p>
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
