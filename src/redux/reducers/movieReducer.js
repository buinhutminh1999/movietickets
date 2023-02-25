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
  detailMovies: {},
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

export const { dangNhap, Logout,LoginErr,GetMovies, GetDetailMovies} = movieReducer.actions

export default movieReducer.reducer