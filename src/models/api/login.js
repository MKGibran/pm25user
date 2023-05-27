import axiosInstance, { HEADERS_API_BEARER } from './config'
// import { UserData, UsersRes } from '../models/users'
import { BASE_URL_API, HEADERS_API, TOKEN_NAME } from './config'
import Cookies from 'js-cookie'
// import { SnackbarProps } from '../models/uiState'

export default {
  async loginUser(data) {
    const res = await axiosInstance
      .post(
        BASE_URL_API + '/admin/login',
        { username: data.username, password: data.password },
        HEADERS_API,
      )
      .then((response) => {
        alert(response.data.message)
        return {
          token: response.data.token,
          current_user: response.data.data,
          data: {
            state: true,
            severity: 'info',
            message: response.data.message,
          },
        }
      })
      .catch((error) => {
        console.log(error.response.data.message)
        alert(error.response.data.message)
        return {
          token: '',
          data: {
            state: true,
            severity: 'error',
            message: error.response.data.message,
          },
        }
      })
    console.log(res)
  },
  async logoutUser() {
    const res = await axiosInstance
      .post(BASE_URL_API + '/admin/logout', {}, HEADERS_API_BEARER())
      .then((response) => {
        if ((sessionStorage.getItem(TOKEN_NAME) || '').length) sessionStorage.clear()
        if (Cookies.get(TOKEN_NAME)) Cookies.remove(TOKEN_NAME)
        return {
          state: true,
          severity: 'info',
          message: response.data.message.toString(),
        }
      })
      .catch((error) => {
        console.error(error.response.data.message)
        return {
          state: true,
          severity: 'error',
          message: error.response.data.message.toString(),
        }
      })
    return res
  },
}
