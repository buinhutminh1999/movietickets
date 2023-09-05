// rxs
import { createSlice } from '@reduxjs/toolkit'
let userName = null;
let accessToken = null;
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
  listMovies: [],
  thongTinFlim: {},
  heThongRap: [],
  cumRapTheoHeThongRap: [],
  info: [],
  danhSachNguoiDung: [],
  scrollToRef: null
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
      localStorage.setItem("userMovies", JSON.stringify(state.usLogin));
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
    },
    GetHeThongRap: (state, action) => {
      state.heThongRap = action.payload
    },
    GetCumRapTheoHeThongRap: (state, action) => {
      state.cumRapTheoHeThongRap = action.payload
    },
    GetInfo: (state, action) => {
      state.info = action.payload
    },
    GetDanhSachNguoiDung: (state, action) => {
      state.danhSachNguoiDung = action.payload
    },
    scrollMoviesShowTimes: (state, action) => {
      state.scrollToRef = action.payload
    }
  }
})

export const { dangNhap, Logout, LoginErr, GetMovies, GetDetailMovies, GetRoomTicket, PostTickets, ThongTinDatVeReducer, LoadingReducer, GetInfoFlim, GetHeThongRap, GetCumRapTheoHeThongRap, GetInfo, GetDanhSachNguoiDung,scrollMoviesShowTimes  } = movieReducer.actions

export default movieReducer.reducer