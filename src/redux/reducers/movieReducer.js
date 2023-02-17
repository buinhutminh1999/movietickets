// rxs
import { createSlice } from '@reduxjs/toolkit'
let userName = ''
if(localStorage.getItem('USER')){
   userName = JSON.parse(localStorage.getItem('USER')) 
}
const initialState = {
    error: '',
    usLogin: userName
}

const movieReducer = createSlice({
  name: 'movieReducer',
  initialState,
  reducers: {
    getError: (state, actions) => { 
      state.error = actions.data
      
     },
     dangNhap: (state, actions) => { 
      state.usLogin = actions.userLogin
      }
  }
});

export const {} = movieReducer.actions

export default movieReducer.reducer