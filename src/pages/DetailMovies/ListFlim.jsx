import React from 'react'
import { Space, Tabs, Modal, Card, Button, Rate } from 'antd';
import { history } from '../../App';
import moment from 'moment';
import { memo } from 'react';

 function ListFlim({detailMovies,tabPosition }) {
  return (
    <>
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
                    return <div key={cumRap.maCumRap}>
                      <p>{cumRap.tenCumRap}</p>
                      <img width={50} src={cumRap.hinhAnh} />
                      <p>{cumRap.diaChi}</p>
                      <div className='row'>
                        {cumRap.lichChieuPhim?.map((rap) => {
                          return <Space wrap className='mr-2' key={rap.maLichChieu}>
                            <Button type="primary" ghost onClick={() => {
                              localStorage.setItem('DetailFlim', JSON.stringify(detailMovies))
                              history.push(`/checkout/${rap.maLichChieu}`)
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
    </>
  )
}

export default memo(ListFlim)
