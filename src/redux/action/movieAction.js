import axios from "axios"
import { history } from "../../App";
import { TOKEN, URL_API } from "../../ulti/setting"
import { dangNhap, LoginErr, GetDetailMovies, GetRoomTicket, PostTickets, thongTinDatVeReducer, ThongTinDatVeReducer, LoadingReducer } from "../reducers/movieReducer";
const getAccessToken =  localStorage.getItem('accessToken')
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
                console.log(result)
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
                 dispatch(LayDanhSachPhongVe(thongTinDatVe.maLichChieu))//load l???i chi ti???t ph??ng v??
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
            url : `${URL_API}/QuanLyNguoiDung/ThongTinTaiKhoan`,
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


