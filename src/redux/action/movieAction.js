import axios from "axios"
import { history } from "../../App";
import { TOKEN, URL_API } from "../../ulti/setting"

export const DangKyAction = (props,value) => {
    
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
                history.push('/home')
                console.log(result)
                localStorage.setItem('userMovies', JSON.stringify(result.data.content))
                dispatch2({
                    type: 'movieReducer/dangNhap',
                    userLogin: result.data.content
                })
                console.log('login dang nhap', value)
            })
            .catch(err => {
               console.log('err',err)
                dispatch2({
                    type: 'movieReducer/LoginErr',
                    loginErr: err.response.data.content
                })
                
            })
    }

}
