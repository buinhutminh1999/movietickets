import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { TOKEN, URL_API } from '../../ulti/setting';
// - Thứ tự thao tác trong 1 ứng dụng:
// 	+ b1: load ứng dụng lên
// 	+ b2: khởi tạo state, hàm
// 	+ b3: chạy return => render UI
// 	+ b4: useEffect gọi hàm call api (didmount)
// 	+ b5: setState trong hàm call api => render lại ui (lặp lại b2 => nhưng ko khởi tạo các hook, nếu ko có useEffect sẽ lặp vô tận)
// 	+ b6: arr có data mới
// 	+ b7: binding data lên UI

export default function MoviesShowTime() {
    let [key, setKey] = useState('BHDStar')
    let [listCumRap, setCumRap] = useState([])
    let [data, setData] = useState({})
    const onChange = (key) => {
        setKey(key)//luồng updating
    };
    let [listCinema, setListCinema] = useState([])
    let getListCenima = (url, setValue) => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/${url}`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise.then((result) => {
            setValue(result.data.content)
        })
            .catch((err) => { console.log(err) })
    }

    useEffect(() => {
        let object = listCumRap.find((maRap) => {
            return maRap.maHeThongRap == key
        })
        setData(object)
    })


    useEffect(() => {
        console.log('didmount')
        getListCenima('QuanLyRap/LayThongTinHeThongRap', setListCinema)
    }, [])
    useEffect(() => {
        console.log('didmount api')
        getListCenima('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01', setCumRap)
    }, [])

    let layCumRapDauTien = () => {
        // return object.lstCumRap.map(item => {
        //     let { tenCumRap, hinhAnh, diaChi, maCumRap } = item
        //     return ''
        // })
    }

    let check = (key) => {
        let object = listCumRap.find((maRap) => {
            return maRap.maHeThongRap == key
        })
        // setData(object)
        if (object == undefined) {//render 2 lần
            // console.log('render undefined')
            return
        } else {
            // console.log('render arr')
            return object.lstCumRap.map(item => {
                let { tenCumRap, hinhAnh, diaChi, maCumRap } = item
                return <div className="row" key={maCumRap}>
                    <span className='alert alert-success' onClick={() => {
                        //hiện danh sách phim
                    }}>{tenCumRap}</span>
                </div>

                // return item.danhSachPhim.map((item2) => {
                //     let { tenPhim, sapChieu, dangChieu, hinhAnh, hot, maPhim } = item2
                //     return item2.lstLichChieuTheoPhim.map((item3, index) => {

                //         // return <button className='btn btn'>{tenCumRap}</button>
                //         // return <div key={index}>
                //         //     {dangChieu ? <p className='alert alert-danger'>Tên phim: {tenPhim}</p> : ''}
                //         //     <p>{dangChieu ? 'Đang chiếu' : ''}</p>
                //         // </div>

                //     })
                // })
            })

        }
    }
    const items = listCinema.map((item) => {

        return {
            key: `${item.maHeThongRap}`,
            label: <div className='row p-3'>
                <div style={{ width: '50px' }}>
                    <img className='img-fluid' src={item.logo} />
                </div>
            </div>,
            children: item.maHeThongRap == key ? check(key) : '',

        }
    })
    console.log('object', data)
    return (
        <div className='container' style={{ margin: '100px 0' }}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

        </div>
    )
}
