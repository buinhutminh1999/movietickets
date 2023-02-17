import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TOKEN } from '../../ulti/setting';
import { Carousel } from 'antd';
const contentStyle = {
    height: '100vh',
    width: '100%',
    objectFit: 'cover',
};


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
        <Carousel effect="fade" autoplay='true' className='container'>
            {getImg.map((item) => {
                return <div key={item.maPhim}>
                    <img style={contentStyle} src={item.hinhAnh} alt="" />
                </div>
            })}

        </Carousel >

    )
}
