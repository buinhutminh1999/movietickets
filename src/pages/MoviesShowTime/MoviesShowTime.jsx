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
    const onChange = (key) => {
        setKey(key)
    };
    let [listCinema, setListCinema] = useState([])
    let getListCenima = (url,setValue) => {
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
        console.log('didmount')
        getListCenima('QuanLyRap/LayThongTinHeThongRap',setListCinema)
    }, [])
    useEffect(() => {
        console.log('didmount api')
        getListCenima('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01',setCumRap)
    }, [])

    let check = (key) => {

        let object = listCumRap.find((maRap) => {
            return maRap.maHeThongRap == key
        })
        if (object == undefined) {//render 2 lần
            console.log('render undifine')
            return
        } else {
            console.log('render arr')
            return object.lstCumRap.map(item => {
                let { tenCumRap, hinhAnh, diaChi, maCumRap } = item
                return item.danhSachPhim.map((item2) => {
                    let { tenPhim, sapChieu, dangChieu, hinhAnh, hot, maPhim } = item2
                    return item2.lstLichChieuTheoPhim.map((item3, index) => {
                        return <div key={index}>
                            <p>Tên phim: {tenPhim}</p>
                            <p>{dangChieu ? 'Đang chiếu' : ''}</p>
                        </div>

                    })
                })
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

    return (
        <div className='container'>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
           
        </div>
    )
}
