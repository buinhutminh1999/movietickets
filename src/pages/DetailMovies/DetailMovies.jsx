import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { Space, Tabs, Modal, Card, Button, Rate,Radio  } from 'antd';

import { useState } from 'react';
import { LayThongTinLichChieuPhim } from '../../redux/action/movieAction';
import moment from 'moment';
const { Meta } = Card;
export default function DetailMovies(props) {
  let { detailMovies } = useSelector(state => state.movieReducer)
  let dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let { id } = props.match.params
    let action = LayThongTinLichChieuPhim(id)
    dispatch(action)

  }, [])

  const [tabPosition, setTabPosition] = useState('left');
  // console.log('detailMovies', detailMovies)

  return (
    <div className='container-fluid'>
      <CustomCard style={{ backgroundImage: `url(${detailMovies.hinhAnh}) `, minHeight: '480px', backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="row">
          <div className="col-3">
            {/* <svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg> */}
            <img
              className='img-fluid' alt="" src={detailMovies.hinhAnh} onClick={() => setOpen(true)} />
            <Modal
              title="Modal 1000px width"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
            >
              <iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${detailMovies.trailer?.slice(17)}`}>
              </iframe>

            </Modal>
          </div>
          <div className="col-9">
            <h1>{detailMovies.tenPhim}</h1>
            <p>Nội dung</p>
            <span>{detailMovies.moTa}</span>
            <p>Ngày chiếu</p>
            {moment(detailMovies.ngayKhoiChieu).format('DD/MM/YYYY')}
          </div>
        </div>
      </CustomCard>
      <div className='row mt-5'>
        <div className='col-9'>
          <>
            <Space
              style={{
                marginBottom: 24,
              }}
            >
            </Space>
            <Tabs
              tabPosition={tabPosition}
              items={detailMovies.heThongRapChieu?.map((item) => {
                return {
                  label: <div className='logo'>
                    <div className='logo__item'>
                      <img width={50} src={item.logo} alt="" />
                    </div>
                    <div className='logo__content'>
                      <p>{item.maHeThongRap}</p>
                    </div>
                  </div>,
                  key: item.maHeThongRap,
                  children: item.cumRapChieu.map((cumRap) => {
                    console.log('cumRap', cumRap)
                    return <div key={cumRap.maCumRap}>
                      <p>{cumRap.tenCumRap}</p>
                      <img width={50} src={cumRap.hinhAnh} />
                      <p>{cumRap.diaChi}</p>
                      <div className='row'>
                        {cumRap.lichChieuPhim?.map((rap) => {
                          return <Space wrap className='mr-2'>
                            <Button type="primary" ghost onClick={() => { 

                             }}>
                              {rap.tenRap} - {moment(rap.ngayChieuGioChieu).format('hh:mm A')}
                            </Button>
                          </Space>
                        })}
                      </div>
                    </div>
                  }),
                }
              })}
            />
          </>
        </div>
        <div className="col-3 text-center">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<div>
              <p className='m-0' style={{ fontSize: '35px' }}>🥳</p>
              <p style={{ fontSize: '25px' }}>Đáng xem</p>
            </div>}
          >
            <Rate allowHalf value={detailMovies.danhGia / 2} disabled />
          </Card>
        </div>
      </div>
    </div>
  )
}

