import axios, { BASE_URL_API, HEADERS_API } from './config'

export default {
  async signUp(data) {
    const response = await axios
      .post(BASE_URL_API + '/register', data, HEADERS_API)
      .then((res) => {
        console.log(res)
        return {
          status: res.status === 201 ? 'success' : 'failed',
          state: {
            open: true,
            severity: 'info',
            message: res.data.message,
          },
          data: res.data.data.id,
        }
      })
      .catch((err) => {
        return {
          status: 'error',
          state: {
            open: true,
            severity: 'danger',
            message: err.response?.data.message,
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
          status: res.status === 200 ? 'success' : 'failed',
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
          status: res.status === 200 ? 'success' : 'failed',
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
