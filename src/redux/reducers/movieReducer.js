// rxs
import { createSlice } from '@reduxjs/toolkit'
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
  accessToken: accessToken,
  roomTicket: '',
  postTickets: '',
  thongTinVe: {},
  isLoading: false,
  listMovies:[],
  thongTinFlim: {}
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
      state.listMovies = actions.payload
    },
    LoginErr: (state, actions) => {
      state.loginErr = actions.payload
    },
    GetDetailMovies: (state, actions) => {
      state.detailMovies = actions.payload
    },
    GetRoomTicket: (state, action) => {
      state.roomTicket = action.payload
    },
    PostTickets: (state, action) => {
      state.postTickets = action.payload
    },
    ThongTinDatVeReducer: (state, action) => {
      state.thongTinVe = action.payload
    },
    LoadingReducer: (state, action) => {
      state.isLoading = action.payload
    },
    GetInfoFlim: (state, action) => { 
      state.thongTinFlim = action.payload
     }
  }
})

export const { dangNhap, Logout, LoginErr, GetMovies, GetDetailMovies, GetRoomTicket, PostTickets, ThongTinDatVeReducer, LoadingReducer, GetInfoFlim } = movieReducer.actions

export default movieReducer.reducer