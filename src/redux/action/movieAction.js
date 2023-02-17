import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TOKEN, URL_API } from "../../ulti/setting"

export const dangKyAction = (value) => {
   
    console.log('value', value)
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
                alert('dang ky thanhf cong')
            })
            .catch(err => {
                // dispatch2()
                console.log(err)
                dispatch2({
                    type: 'movieReducer/getError',
                    data: err.response.data.content
                })
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
                alert('đăng nhập thành công')
                localStorage.setItem('USER', JSON.stringify(value))
                dispatch2({
                    type: 'movieReducer/dangNhap',
                    userLogin: value.taiKhoan,
                })
            })
            .catch(err => {
                // dispatch2()
                console.log(err)
                // console.log('dang nhap that bai')
                // dispatch2({
                //     type: 'movieReducer/getError',
                //     data: err.response.data.content
                // })
            })
    }

}
