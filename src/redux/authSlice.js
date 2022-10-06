import { createSlice } from '@reduxjs/toolkit'

const initialState = { isLogin: false, userName: null, authorization: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN: (state, action) => {
      console.log(action)
      state.isLogin = true
      state.userName = action.payload.userName
      state.authorization = action.payload.authorization
    },
    SET_REFRESH: (state, action) => {
      state.authorization = action.payload
    },
    SET_LOGOUT: (state) => {
      console.log('logout')
      state.isLogin = false
      state.userName = null
      state.authorization = null
    },
  },
})

export const { SET_LOGIN, SET_REFRESH, SET_LOGOUT } = authSlice.actions
export default authSlice
