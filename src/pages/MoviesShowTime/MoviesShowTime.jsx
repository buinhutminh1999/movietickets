import axios from 'axios'
import React, { useEffect, useState, memo, useMemo, useCallback } from 'react'
import { Radio, Space, Tabs, Button, Card, Col, Row } from 'antd';
import { TOKEN, URL_API } from '../../ulti/setting';
import moment from 'moment/moment';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;

// - Thứ tự thao tác trong 1 ứng dụng:
// 	+ b1: load ứng dụng lên
// 	+ b2: khởi tạo state, hàm
// 	+ b3: chạy return => render UI
// 	+ b4: useEffect gọi hàm call api (didmount)
// 	+ b5: setState trong hàm call api => render lại ui (lặp lại b2 => nhưng ko khởi tạo các hook, nếu ko có useEffect sẽ lặp vô tận)
// 	+ b6: arr có data mới
// 	+ b7: binding data lên UI


function MoviesShowTime() {

    const [tabPosition, setTabPosition] = useState('left');
    const [heThongRap, setHeThongRap] = useState([])
    const [lichChieuTheoRap, setLichChieuTheoRap] = useState([])
    const [rap, setRap] = useState('')
    const [cumRap, setCumRap] = useState('')

    let getListCenima = (url, setValue) => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/${url}`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise.then((result) => {
            if (setValue == setHeThongRap) {
                setRap(result.data.content[0].maHeThongRap)
            } else {
                setCumRap(result.data.content[5].lstCumRap[0])
            }

            setValue(result.data.content)
        })
            .catch((err) => { console.log(err) })
    }

    useEffect(() => {
        getListCenima('QuanLyRap/LayThongTinHeThongRap', setHeThongRap)
        getListCenima('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01', setLichChieuTheoRap)
    }, [])

    useEffect(() => {
        let object = lichChieuTheoRap.find((item) => {
            return item.maHeThongRap == rap
        })
        setCumRap(object?.lstCumRap[0])
    }, [rap])


    let checkTheoRap = () => {
        return lichChieuTheoRap.map((lichChieu, index) => {
            if (lichChieu.maHeThongRap == rap) {
                return lichChieu.lstCumRap.map((item) => {
                    return <Button type={item.tenCumRap == cumRap.tenCumRap ? 'primary' : 'dashed'} key={item.maCumRap} onClick={() => {
                        setCumRap(item)
                    }}>
                        <p>{item.tenCumRap}</p>
                    </Button>
                })
            }
        })
    }
    // console.log('lichChieuTheoRap', lichChieuTheoRap)
    // console.log('cumRap', cumRap)

    return (
        <div className='container d-flex' style={{ margin: '100px 0' }}>
            <div className="col-6">
                <>
                    <Space
                        style={{
                            marginBottom: 24,
                        }}
                    >
                    </Space>
                    <Tabs
                        tabPosition={tabPosition}
                        items={heThongRap?.map((item) => {
                            return {
                                label: <div className='logo '>
                                    <div className='logo__item'>
                                        <img width={30} src={item.logo} alt="" />
                                    </div>
                                    <div className='logo__content'>
                                        <p>{item.maHeThongRap}</p>
                                    </div>
                                </div>,
                                key: item.maHeThongRap,
                                children: <Space className="site-button-ghost-wrapper" wrap>{checkTheoRap()}</Space>
                            };
                        })}
                        onChange={(e) => {
                            setRap(e)
                        }}
                    />
                </>
            </div>
            <div className='col-6'>
                <Row gutter={[16, 16]}>
                    {cumRap?.danhSachPhim?.map((item) => {
                        if (item.dangChieu) {
                            return <Col span={12} key={item.maPhim}>
                                <Card hoverable title={item.tenPhim} bordered={true}>
                                    <Space className="site-button-ghost-wrapper" wrap>
                                        {item.lstLichChieuTheoPhim.map((lst) => {
                                            return <Button type="primary" ghost to={''} className='col' key={lst.maLichChieu}>
                                                {moment(lst.ngayChieuGioChieu).format('hh:mm A')}
                                            </Button>
                                        })}
                                    </Space>
                                </Card>
                            </Col>
                        }
                    })}
                </Row>


            </div>


        </div >

    )
}
export default memo(MoviesShowTime)