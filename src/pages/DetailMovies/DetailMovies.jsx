import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { Radio, Space, Tabs } from 'antd';
import { useState } from 'react';
import { LayThongTinLichChieuPhim } from '../../redux/action/movieAction';

export default function DetailMovies(props) {
  let { detailMovies } = useSelector(state => state.movieReducer)
  let dispatch = useDispatch()
  useEffect(() => {
    let { id } = props.match.params
    let action = LayThongTinLichChieuPhim(id)
    dispatch(action)
  }, [])
  const [tabPosition, setTabPosition] = useState('left');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  console.log(detailMovies)
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
            <img src={detailMovies.hinhAnh} className='img-fluid' alt="" /> */
          </div>
          <div className="col-6">

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
              children: item.cumRapChieu.map((item) => {
                console.log(item)
                  return  item.tenCumRap
              }),
            }
          })}
        />
      </>
    </div>
  )
}

// {new Array(3).fill(null).map((_, i) => {
//   const id = String(i + 1);
//   return {
//     label: `Tab ${id}`,
//     key: id,
//     children: `Content of Tab ${id}`,
//   };
// })}
