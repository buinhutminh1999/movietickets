// rxs
import { createSlice } from '@reduxjs/toolkit'
import { isObject } from 'formik';

let userName = null;
let accessToken = null;
// userName = JSON.parse(localStorage.getItem('userMovies'))
if (localStorage.getItem('userMovies') && localStorage.getItem('accessToken')) {
  userName = JSON.parse(localStorage.getItem('userMovies'))


} 


const initialState = {
  regisErr: '',
  loginErr: null,
  usLogin: userName,
  detailMovies: {},
  accessToken: accessToken
}



const movieReducer = createSlice({
  name: 'movieReducer',
  initialState,
  reducers: {
    getError: (state, actions) => {
      state.regisErr = actions.data
    },
    dangNhap: (state, actions) => {
      state.usLogin = actions.payload
      localStorage.setItem('accessToken', state.usLogin.accessToken)
    },
    Logout: (state, actions) => {
      state.usLogin = actions.payload
    },
    GetMovies: (state, actions) => {
      state.detailMovies = actions.payload
    },
    LoginErr: (state, actions) => {
      state.loginErr = actions.payload
    },
    GetDetailMovies: (state, actions) => {
      state.detailMovies = actions.payload
    }
  }
})

export const { dangNhap, Logout, LoginErr, GetMovies, GetDetailMovies } = movieReducer.actions

export default movieReducer.reducer