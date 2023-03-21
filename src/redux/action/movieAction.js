import { Result } from "antd";
import axios from "axios"
import { history } from "../../App";
import { TOKEN, URL_API } from "../../ulti/setting"
import { GetHeThongRap, dangNhap, LoginErr, GetDetailMovies, GetRoomTicket, PostTickets, thongTinDatVeReducer, ThongTinDatVeReducer, LoadingReducer, GetMovies, GetInfoFlim, GetCumRapTheoHeThongRap, GetInfo } from "../reducers/movieReducer";
const getAccessToken = localStorage.getItem('accessToken')
const usLogin = localStorage.getItem('userMovies')

export const DangKyAction = (props, value) => {

    return (dispatch2) => {
        let promise = axios({
            method: 'POST',
            url: `${URL_API}/QuanLyNguoiDung/DangKy`,
            data: value,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise
            .then(result => {
                history.push('/login')
            })
            .catch(err => {
                // dispatch2()
                console.log(err)

            })
    }
}

export const dangNhapAction = (value) => {

    return (dispatch2) => {
        let promise = axios({
            method: 'POST',
            url: `${URL_API}/QuanLyNguoiDung/DangNhap`,
            data: value,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise
            .then(result => {
                history.goBack()
                localStorage.setItem('userMovies', JSON.stringify(result.data.content))
                const action = dangNhap(result.data.content)
                dispatch2(action)
            })
            .catch(err => {
                console.log('err', err)
                dispatch2(LoginErr(err.response.data.content))
            })
    }

}
export const LayDanhSachPhim = (tenPhim = '') => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'GET',
            url: tenPhim.trim() !== ''
                ? `${URL_API}/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`
                : `${URL_API}/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise.then((result) => {

            dispatch(GetMovies(result.data.content))
            dispatch(LoadingReducer(false))
        })
            .catch((err) => { console.log(err) })
    }
}

export const layThongTinHeThongRap = () => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyRap/LayThongTinHeThongRap`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise.then((result) => {
            dispatch(GetHeThongRap(result.data.content))
            dispatch(LoadingReducer(false))
        })
            .catch((err) => { console.log(err) })
    }
}

export const layThongTinCumRapTheoHeThong = (maRap) => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise.then((result) => {
            dispatch(GetCumRapTheoHeThongRap(result.data.content))
            dispatch(LoadingReducer(false))
        })
            .catch((err) => { console.log(err) })
    }
}

export const LayThongTinLichChieuPhim = (id) => {
    return (dispatch2) => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
            headers: {
                TokenCybersoft: TOKEN,

            }
        })
        promise
            .then(result => {
                dispatch2(GetDetailMovies(result.data.content))

            })
            .catch(err => {

                console.log(err)
            })
    }

}

export const LayDanhSachPhongVe = (id) => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })

        promise
            .then((result) => {
                dispatch(GetRoomTicket((result.data.content)))
                dispatch(LoadingReducer(false))
            })
            .catch((err) => {
                dispatch(LoadingReducer(false))

            })
    }
}

export const datVe = (thongTinDatVe) => {

    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'POST',
            url: `${URL_API}/QuanLyDatVe/DatVe`,
            data: thongTinDatVe,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: "Bearer " + getAccessToken
            }
        })

        promise
            .then((result) => {
                console.log('result.data.content', result.data.content)
                dispatch(PostTickets(result.data.content))
                dispatch(LayDanhSachPhongVe(thongTinDatVe.maLichChieu))//load lại chi tiết phòng vé
                dispatch(LoadingReducer(false))
            })
            .catch((err) => {
                dispatch(LoadingReducer(false))

            })
    }
}

export const thongTinDatVe = () => {
    return (dispatch) => {
        let promise = axios({
            method: 'POST',
            url: `${URL_API}/QuanLyNguoiDung/ThongTinTaiKhoan`,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: 'Bearer ' + getAccessToken
            }
        })

        promise.then((result) => {
            dispatch(ThongTinDatVeReducer(result.data.content))
        })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const themPhimUploadHinh = (formData) => {
    return (dispatch) => {
        let promise = axios({
            method: 'POST',
            url: `${URL_API}/QuanLyPhim/ThemPhimUploadHinh`,
            data: formData,
            headers: {
                TokenCybersoft: TOKEN,
            }
        })

        promise.then((result) => {
            dispatch(result.data.content)
        })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const layThongTinFlim = (id) => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
            headers: {
                TokenCybersoft: TOKEN,
            }
        })

        promise.then((result) => {
            dispatch(GetInfoFlim(result.data.content))
            dispatch(LoadingReducer(false))
        })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const capNhatPhimUpload = (formData) => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'POST',
            url: `${URL_API}/QuanLyPhim/CapNhatPhimUpload`,
            data: formData,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: 'Bearer ' + getAccessToken,
            }
        })

        promise.then((result) => {
            dispatch(LoadingReducer(false))
            history.push('/admin/flim')
            dispatch(LayDanhSachPhim())
        })
            .catch((err) => {
                dispatch(LoadingReducer(false))
                console.log(err)
            })
    }
}

export const xoaPhim = (id) => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'DELETE',
            url: `${URL_API}/QuanLyPhim/XoaPhim?MaPhim=${id}`,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: 'Bearer ' + getAccessToken,
            }
        })

        promise.then((result) => {
            dispatch(LoadingReducer(false))
            dispatch(LayDanhSachPhim())
            console.log(result)
        })
            .catch((err) => {
                dispatch(LoadingReducer(false))
                console.log(err)
            })
    }
}

export const taoLichChieu = (lichChieu) => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'POST',
            url: `${URL_API}/QuanLyDatVe/TaoLichChieu`,
            data: lichChieu,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: 'Bearer ' + getAccessToken,
            }
        })

        promise.then((result) => {
            dispatch(LoadingReducer(false))
            console.log(result)
        })
            .catch((err) => {
                dispatch(LoadingReducer(false))
                console.log(err)
            })
    }
}

export const capNhatThongTinNguoiDung = (thongTin) => {
    return (dispatch) => {
        dispatch(LoadingReducer(true))
        let promise = axios({
            method: 'PUT',
            url: `${URL_API}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            data: thongTin,
            headers: {
                TokenCybersoft: TOKEN,
                Authorization: 'Bearer ' + getAccessToken,
            }
        })

        promise.then((result) => {
            dispatch(LoadingReducer(false))
            console.log(result)
        })
            .catch((err) => {
                dispatch(LoadingReducer(false))
                console.log(err)
            })
    }
}
