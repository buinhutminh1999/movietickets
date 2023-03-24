import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thongTinDatVe } from '../../redux/action/movieAction'
import { Card, Col, Row } from 'antd';
import moment from 'moment';
export default function KetQuaDatVe() {
    let { thongTinVe } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()

    const renderThongTinDatVe = () => {
        return thongTinVe.thongTinDatVe?.map((item) => {
            return <Col span={8} key={item.tenPhim}>

                <Card title={item.tenPhim} bordered={true}>
                    <Row >
                        <Col span={12}>Ngày đặt</Col>
                        <Col span={12}>{moment(item.ngayDat).format('DD/MM/YYYY')}</Col>
                    </Row>
                    <Row >
                        <Col span={12}>RẠP {item.danhSachGhe[0].tenRap}</Col>
                        <Col span={12}>{item.danhSachGhe[0].tenHeThongRap}</Col>
                    </Row>
                    <Row >
                        <Col span={12}>GHẾ</Col>
                        <Col span={12}> {item.danhSachGhe.map((item2, i) => {
                            // console.log('item2', item2)
                            return <span key={i}>{item2.maGhe} {item.danhSachGhe.length == i + 1 ? null : ','} </span>
                        })}</Col>
                    </Row>
                    <Row >
                        <Col span={12}>Tạm tính</Col>
                        <Col span={12}>{(item.giaVe * (item.danhSachGhe.length + 1)).toLocaleString()}</Col>
                    </Row>
                </Card>
            </Col>
        })
    }
    useEffect(() => {
        let action = thongTinDatVe()
        dispatch(action)
    }, [])
    return (
        <div>
            <h3>Kết quả đặt vé</h3>
            <Row gutter={16}>
                {renderThongTinDatVe()}
            </Row>
        </div>
    )
}
