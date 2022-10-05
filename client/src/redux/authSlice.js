import { createSlice } from '@reduxjs/toolkit'

const initialState = { isLogin: false, userName: null, authorization: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN: (state, action) => {
      if (action.payload.authorization) {
        state.isLogin = true
        console.log('7-1. store에 새 토큰 저장:', action.payload.authorization)
        console.log('7-3. 새 username 받아옴: ', action.payload.userName)
      } else {
        '7-2. 기존 username과 동일: ', state.userName
      }
      state.userName = action.payload.userName
      state.authorization = action.payload.authorization
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
