import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Rate } from 'antd';
import { Card } from 'antd';
import { TOKEN, URL_API } from '../../ulti/setting';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { GetMovies } from '../../redux/reducers/movieReducer';
import { history } from '../../App';
import { LayDanhSachPhim } from '../../redux/action/movieAction';
import _ from 'lodash';

export default function ListMovies(props) {
    let { listMovies } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        let action = LayDanhSachPhim()
        dispatch(action)
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
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className='mt-3'
        >
            {_.isArray(listMovies) ? listMovies.map((item) => {
                if (item.dangChieu) {
                    return <SwiperSlide span={8} className='p-3' key={item.maPhim} onClick={() => {
                        dispatch(GetMovies(item))
                    }}>
                        <Card title={item.tenPhim} bordered={true} className='text-center'>
                            <div className='img__movies m-auto' style={{ height: '260px', width: '185px' }}>
                                <img src={item.hinhAnh} className="img-fluid" style={{ height: '100%' }} />
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className="card-text m-0">{getGetYears(item.ngayKhoiChieu)}</p>
                                <Rate value={item.danhGia / 2} disabled />
                            </div>
                            <div>
                                <button className='btn btn-success' onClick={() => {
                                    history.push(`/detail/${item.maPhim}`)
                                }}>Đặt vé</button>
                            </div>
                        </Card>

                    </SwiperSlide>
                }


            }) : ''}

        </Swiper>
    )
}
