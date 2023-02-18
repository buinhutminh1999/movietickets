import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Rate } from 'antd';
import { Card, Col, Row } from 'antd';
import { TOKEN, URL_API } from '../../ulti/setting';
import { useDispatch } from 'react-redux';
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
        <div className='container'>
            <Row>
                {listMovies.map((item) => {
                    return <Col style={{cursor:'pointer'}} span={8} className='p-3' key={item.maPhim} onClick={() => { 
                        dispatch({
                            type: 'movieReducer/GetMovies',
                            detail: item
                        })
                        props.history.push('/detail-movies')
                     }}> 
                        <Card title={item.tenPhim} bordered={true}>
                            <div className='img__movies m-auto' style={{height:'260px', width:'185px'}}>
                                <img src={item.hinhAnh} className="img-fluid" style={{height:'100%'}} />
                            </div>
                            <div className='d-flex justify-content-between align'>
                                    <p className="card-text m-0">{getGetYears(item.ngayKhoiChieu)}</p>
                                    <Rate value={item.danhGia / 2} disabled />
                                </div>
                        </Card>
                    </Col>

                })}
            </Row>
        </div>
    )
}
