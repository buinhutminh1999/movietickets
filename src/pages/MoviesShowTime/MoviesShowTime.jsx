import axios from 'axios'
import React, { useEffect, useState, memo } from 'react'
import { Tabs } from 'antd';
import { TOKEN, URL_API } from '../../ulti/setting';
import moment from 'moment/moment';
import { NavLink } from 'react-router-dom';

// - Thứ tự thao tác trong 1 ứng dụng:
// 	+ b1: load ứng dụng lên
// 	+ b2: khởi tạo state, hàm
// 	+ b3: chạy return => render UI
// 	+ b4: useEffect gọi hàm call api (didmount)
// 	+ b5: setState trong hàm call api => render lại ui (lặp lại b2 => nhưng ko khởi tạo các hook, nếu ko có useEffect sẽ lặp vô tận)
// 	+ b6: arr có data mới
// 	+ b7: binding data lên UI
const ContainerHeight = 400;
function MoviesShowTime() {
    let [listCumRap, setCumRap] = useState([])
    let [data, setData] = useState({})
    let [key, setKey] = useState(null)// tra ve gia tri dau tien
    let [active, setActive] = useState(0)
    let [test , setTest] = useState()
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
            if (setValue == setListCinema) {
                setKey(result.data.content[0].maHeThongRap)
            }
            setValue(result.data.content)
        })
            .catch((err) => { console.log(err) })
    }


    useEffect(() => {
        if (data == undefined || data.lstCumRap == undefined) {
            return
        } else {
            console.log('data.lstCumRap[active].danhSachPhim', data.lstCumRap[active].danhSachPhim)
        }
    }, [active])

    useEffect(() => {
        console.log('didmount')
        getListCenima('QuanLyRap/LayThongTinHeThongRap', setListCinema)

        getListCenima('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01', setCumRap)
    }, [])

    useEffect(() => {

        let object = listCumRap.find((maRap) => {
            return maRap.maHeThongRap == key
        })
        console.log('object', object)
        setData(object)
    })

    let checkActive = (item) => {
        if (data.lstCumRap[active] == item) {//data khi load lên đầu tiên
            return 'col- 12 alert alert-success'
        } else {
            return 'col- 12 alert alert-danger'
        }
    }

    let danhSachCumRap = () => {
        return data == undefined
            ? null
            : data.lstCumRap.map(item => {
                let { tenCumRap, hinhAnh, diaChi, maCumRap, danhSachPhim } = item
                return <div className='row' key={maCumRap} >
                    <div style={{ cursor: 'pointer' }} className={checkActive(item)}>
                        <p onClick={() => {
                            let vt = data.lstCumRap.findIndex(vt => item == vt)//set array phim
                            if (vt > -1) {
                                setActive(vt)
                            }
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
            children: item.maHeThongRap == key ? danhSachCumRap() : '',

        }
    })

    let listPhimTheoCumRap = () => {
        return data == undefined || data.lstCumRap == undefined || data.lstCumRap[active] == undefined
            ? null
            : data.lstCumRap[active].danhSachPhim.map((item) => {
           
                if (item.dangChieu) {
                    return <div className='' key={item.maPhim}>
                        <div className='d-flex'>
                            <img width={50} height={50} className='img-fluid' src={item.hinhAnh} alt="" />
                            <span key={item.maPhim}>{item.tenPhim}</span>
                        </div>
                        <div className='d-flex row'>
                            {item.lstLichChieuTheoPhim.map((lst) => {
                                return <NavLink to={''} className='col' key={lst.maLichChieu}>
                                    {moment(lst.ngayChieuGioChieu).format('hh:mm A')}
                                </NavLink>
                            })}

                        </div>
                        <hr />
                    </div>

                }
            })
    }

    return (
        <div className='container d-flex' style={{ margin: '100px 0' }}>
            <div className="col-6">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
            <div className='col-6'>
                {
                    listPhimTheoCumRap()

                }
               
            
            </div>


        </div >

    )
}
export default memo(MoviesShowTime)