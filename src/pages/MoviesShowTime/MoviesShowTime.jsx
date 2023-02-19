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
    let [dataRap, setDataRap] = useState([])
    let [active, setActive] = useState(0)
    const onChange = (key) => {
        setKey(key)//luồng updating
        setActive(0)
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
        // console.log('didmount')
        getListCenima('QuanLyRap/LayThongTinHeThongRap', setListCinema)
        getListCenima('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01', setCumRap)
    }, [])

    let checkActive = (data, item, danhSachPhim, dataRap) => {


        if (data.lstCumRap[active] == item) {//data khi load lên đầu tiên
            return 'col- 12 alert alert-success'
        }

        if (danhSachPhim == dataRap) {
            return 'col- 12 alert alert-success'
        } else {
            return 'col- 12 alert alert-danger'
        }

    }

    let check = (key) => {
        if (data == undefined) {
            return
        }
        return data.lstCumRap.map(item => {
            let { tenCumRap, hinhAnh, diaChi, maCumRap, danhSachPhim } = item
            return <div className='row' key={maCumRap} >
                <div style={{ cursor: 'pointer' }} className={checkActive(data, item, danhSachPhim, dataRap)}>
                    <p onClick={() => {
                        let vt = data.lstCumRap.findIndex((vt) => { return item == vt })//set array phim
                        if (vt > -1) {
                            setActive(vt)
                        }
                        setDataRap(danhSachPhim)
                    }}>{tenCumRap}</p>

                </div>

            </div>
        })
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

    let test3 = () => {
        if (data == undefined) {
            return
        } else {
            if (data.lstCumRap == undefined) {
                return
            } else {
                if (data.lstCumRap[active] == undefined) {
                    return
                } else {
                    return data.lstCumRap[active].danhSachPhim.map((item) => {
                        if (item.dangChieu) {
                            return <p>{item.tenPhim}</p>
                        }
                    })
                }
            }

        }


    }
    return (
        <div className='container d-flex' style={{ margin: '100px 0' }}>
            <div className="col-6">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
            <div className='col-6 bg-success'>
                {
                    test3()
                }
            </div>

        </div>

    )
}
