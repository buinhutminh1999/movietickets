import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Rate } from 'antd';
import { Card } from 'antd';
import { TOKEN, URL_API } from '../../ulti/setting';
import { useDispatch } from 'react-redux';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ListMovies(props) {
    let [listMovies, setListMovies] = useState([])
    let getListMovies = () => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise.then((result) => {
            setListMovies(result.data.content)
        })
            .catch((err) => { console.log(err) })
    }

    let dispatch = useDispatch()


    useEffect(() => {
        getListMovies()
    }, [])

    const getGetYears = (date) => {
        let createMovies = new Date(date)
        return createMovies.getFullYear()
    }

    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y,]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className='mt-3'
        >
            {listMovies.map((item) => {
                return <SwiperSlide style={{ cursor: 'pointer' }} span={8} className='p-3' key={item.maPhim} onClick={() => {
                    dispatch({
                        type: 'movieReducer/GetMovies',
                        detail: item
                    })
                    props.history.push('/detail-movies')
                }}>
                    <Card title={item.tenPhim} bordered={true}>
                        <div className='img__movies m-auto' style={{ height: '260px', width: '185px' }}>
                            <img src={item.hinhAnh} className="img-fluid" style={{ height: '100%' }} />
                        </div>
                        <div className='d-flex justify-content-between align'>
                            <p className="card-text m-0">{getGetYears(item.ngayKhoiChieu)}</p>
                            <Rate value={item.danhGia / 2} disabled />
                        </div>
                    </Card>
                </SwiperSlide>

            })}
        </Swiper>
    )
}
