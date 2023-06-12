import axiosInstance, { HEADERS_API_BEARER } from './config'
// import { UserData, UsersRes } from '../models/users'
import { BASE_URL_API, HEADERS_API, TOKEN_NAME } from './config'
import Cookies from 'js-cookie'
// import { SnackbarProps } from '../models/uiState'
import { userActions } from 'src/models/redux/actions/userActions'

export default {
  async loginUser(data) {
    const res = await axiosInstance
      .post(
        BASE_URL_API + '/login',
        { username: data.username, password: data.password },
        HEADERS_API,
      )
      .then((response) => {
        Cookies.set(TOKEN_NAME, response.data.token, { expires: 1 })

        return {
          status: response.status === 200 ? 'success' : 'failed',
          current_user: response.data.data,
          state: {
            open: true,
            severity: 'info',
            message: response.data.message,
          },
        }
      })
      .catch((error) => {
        console.log(error.response)
        return {
          status: 'fail',
          state: {
            open: true,
            severity: 'danger',
            message: error.response.data.message,
          },
        }
      })
    return res
  },

  async logoutUser() {
    console.log(HEADERS_API_BEARER())
    const res = await axiosInstance
      .post(BASE_URL_API + '/logout', {}, HEADERS_API_BEARER())
      .then((response) => {
        return {
          status: response.status === 200 ? 'success' : 'failed',
          data: { open: true, severity: 'info', message: response.data.message },
        }
      })
      .catch((error) => {
        console.error(error.response.data.message)
        return {
          status: 'fail',
          data: { open: true, severity: 'danger', message: error.response.data.message },
        }
      })
    return res
  },

  async forgotPassword(data) {
    console.log(data)
    const res = await axiosInstance
      .post(BASE_URL_API + '/forgot-password', data, HEADERS_API_BEARER())
      .then((response) => {
        return {
          status: response.status === 200 ? 'success' : 'failed',
          data: { open: true, severity: 'info', message: response.data.message },
          userId: response.data.data.id,
        }
      })
      .catch((error) => {
        console.error(error.response.data.message)
        return {
          status: 'fail',
          data: { open: true, severity: 'danger', message: error.response.data.message },
        }
      })
    return res
  },

  async forgotPasswordOtp(data) {
    console.log(data)
    const res = await axiosInstance
      .post(BASE_URL_API + '/forgot-password/verify', data, HEADERS_API_BEARER())
      .then((response) => {
        return {
          status: response.status === 200 ? 'success' : 'failed',
          data: { open: true, severity: 'info', message: response.data.message },
          tokenUser: response.data.data.token,
          otp_id: response.data.data.otp_id,
        }
      })
      .catch((error) => {
        console.error(error.response.data.message)
        return {
          status: 'fail',
          data: { open: true, severity: 'danger', message: error.response.data.message },
        }
      })
    return res
  },

  async forgotPasswordSubmit(data) {
    console.log(data)
    const res = await axiosInstance
      .post(BASE_URL_API + '/forgot-password/verify/set-password', data, HEADERS_API_BEARER())
      .then((response) => {
        console.log(response.data)
        return {
          status: response.status === 200 ? 'success' : 'failed',
          data: { open: true, severity: 'info', message: response.data.message },
        }
      })
      .catch((error) => {
        console.error(error.response.data.message)
        return {
          status: 'fail',
          data: { open: true, severity: 'danger', message: error.response.data.message },
        }
      })
    return res
  },
}
