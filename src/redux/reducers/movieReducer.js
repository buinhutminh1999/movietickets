// rxs
import { createSlice } from '@reduxjs/toolkit'
let userName = null;
if (localStorage.getItem('userMovies')) {
  userName = JSON.parse(localStorage.getItem('userMovies'))
  console.log('userName', userName)
}


const initialState = {
  regisErr: '',
  loginErr: null,
  usLogin: userName,
  detailMovies: null,
}



const movieReducer = createSlice({
  name: 'movieReducer',
  initialState,
  reducers: {
    getError: (state, actions) => {
      state.regisErr = actions.data

    },
    dangNhap: (state, actions) => {
      state.loginErr = null;
      state.usLogin = actions.userLogin
    },
    Logout: (state, actions) => {
      state.usLogin = actions.userLogout
    },
    GetMovies: (state, actions) => {
      state.detailMovies = actions.detail
    },
    LoginErr: (state, actions) => {
      state.loginErr = actions.loginErr
    }
  }
})

export const { } = movieReducer.actions

export default movieReducer.reducer