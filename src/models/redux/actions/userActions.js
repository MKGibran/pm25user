import userSlice from '../store/userSlice'
import loginAPI from '../../api/login'
import { globalUiActions } from './globalUiActions'
import { createAsyncThunk } from '@reduxjs/toolkit'

import Cookies from 'js-cookie'
import { TOKEN_NAME } from 'src/models/api/config'

export const userActions = userSlice.actions

export const userLogout = createAsyncThunk('auth/logout', async function (_payload, thunkAPI) {
  loginAPI
    .logoutUser()
    .then((res) => {
      console.log(res.status)
      if (res.status === 'success') {
        if ((sessionStorage.getItem(TOKEN_NAME) || '').length) sessionStorage.clear()
        if (Cookies.get(TOKEN_NAME)) Cookies.remove(TOKEN_NAME)
        thunkAPI.dispatch({ type: 'user/LOGOUT' })
      }
      console.log(res.data)
      thunkAPI.dispatch(globalUiActions.setToastMessage(res.data))
    })
    .catch((err) => thunkAPI.dispatch(globalUiActions.setToastMessage(err.data)))
  console.log('logged out')
})
