import axios, { BASE_URL_API, HEADERS_API, TOKEN_NAME } from './config'

export default {
  async signUp(data) {
    const response = await axios
      .post(BASE_URL_API + '/register', data)
      .then((res) => {
        return {
          status: 'success',
          state: {
            open: true,
            severity: 'info',
            message: res.data.message,
          },
          data: res.data,
        }
      })
      .catch((err) => {
        alert(err.response.data.message)
        return {
          status: 'error',
          state: {
            open: true,
            severity: 'danger',
            message: err.reponse.data.message,
          },
        }
      })
    return response
  },
  async checkOtp(data) {
    const response = await axios
      .post(BASE_URL_API + '/register/verify', data)
      .then((res) => {
        return {
          status: 'success',
          state: {
            open: true,
            severity: 'info',
            message: res.data.message,
          },
          data: res.data,
        }
      })
      .catch((err) => {
        console.log(err.response)
        return {
          status: 'error',
          state: {
            open: true,
            severity: 'danger',
            message: err.response.data.message,
          },
        }
      })
    return response
  },
  async resentOtp(data) {
    const response = await axios
      .post(BASE_URL_API + '/register/otp', data)
      .then((res) => {
        console.log(res)
        return {
          status: 'success',
          state: {
            open: true,
            severity: 'info',
            message: res.data.message,
          },
          data: res.data,
        }
      })
      .catch((err) => {
        return {
          status: 'error',
          state: {
            open: true,
            severity: 'danger',
            message: err.reponse.data.message,
          },
        }
      })
    return response
  },
}
