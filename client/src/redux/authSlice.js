import { createSlice } from '@reduxjs/toolkit'

const initialState = { isLogin: false, userName: null, accessToken: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN: (state, action) => {
      console.log(action)
      state.isLogin = true
      state.userName = action.payload.userName
      state.accessToken = action.payload.accessToken
    },
    REFRESH: (state, action) => {
      state.accessToken = action.payload
    },
    SET_LOGOUT: (state) => {
      console.log('logout')
      state.isLogin = false
      state.userName = null
      state.accessToken = null
    },
  },
})

export const { SET_LOGIN, refresh, SET_LOGOUT } = authSlice.actions
export default authSlice
