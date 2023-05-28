import axios, { BASE_URL_API, HEADERS_API, TOKEN_NAME } from './config'

export default {
  async signUp(data) {
    console.log(data)
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
    console.log(data)
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
    console.log(data)
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
