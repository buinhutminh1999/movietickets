import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomCard, Button } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { Space, Tabs, Modal } from 'antd';
import { useState } from 'react';
import { LayThongTinLichChieuPhim } from '../../redux/action/movieAction';
import moment from 'moment';


export default function DetailMovies(props) {
  let { detailMovies } = useSelector(state => state.movieReducer)
  let dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [text, setText] = useState()
  useEffect(() => {
    let { id } = props.match.params
    let action = LayThongTinLichChieuPhim(id)
    dispatch(action)

  }, [])
  const [tabPosition, setTabPosition] = useState('left');

  return (
    <div className='container-fluid'>
      <CustomCard style={{ backgroundImage: `url(${detailMovies.hinhAnh}) `, minHeight: '480px', backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="row">
          <div className="col-6">
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


            {/* <img src={detailMovies.hinhAnh} className='img-fluid' alt="" /> */}
          </div>
          <div className="col-6">
            <h1>{detailMovies.tenPhim}</h1>
            <p>Nội dung</p>
            <span>{detailMovies.moTa}</span>
            <p>Ngày chiếu</p>
            {moment(detailMovies.ngayKhoiChieu).format('DD/MM/YYYY')}
          </div>
        </div>
      </CustomCard>
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
              label: `${item.maHeThongRap}`,
              key: item.maHeThongRap,
              children: item.cumRapChieu.map((cumRap) => {
                
                return cumRap.tenCumRap
              }),
            }
          })}
        />
      </>
    </div>
  )
}

