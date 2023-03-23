import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function CarouselD() {
    let [getImg, setGetImg] = useState([])
    let getBanner = () => {
        let promise = axios({
            method: 'GET',
            url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner'
        })

        promise.then((result) => {
            setGetImg(result.data.content)
        })
            .catch((err) => { console.log(err) })
    }
    useEffect(() => {
        getBanner()
    }, [])

    return (
        <section className='carousel'>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, A11y,]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className='mt-3'
            >
                {getImg?.map((item) => {
                    return <SwiperSlide key={item.maBanner}>
                        <img style={{height:'100vh'}}
                            className="d-block w-100"
                            src={item.hinhAnh}
                            alt="First slide"
                        />
                    </SwiperSlide>
                })}
            </Swiper >
        </section>
    )
}
