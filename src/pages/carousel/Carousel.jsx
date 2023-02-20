import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap';
// import { Carousel } from 'antd';

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
        <Carousel variant="dark" fade='true' >
            {
                getImg.map((item) => {
                    return <Carousel.Item key={item.maBanner}>
                        <img
                            className="d-block w-100"
                            src={item.hinhAnh}
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
                    </Carousel.Item>
                })
            }
        </Carousel>


    )
}
