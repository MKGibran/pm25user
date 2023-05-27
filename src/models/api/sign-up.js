import axios, { BASE_URL_API, HEADERS_API, TOKEN_NAME } from './config'

export default {
  async signUp(data) {
    console.log(data)
    const response = await axios
      .post(BASE_URL_API + '/register', data)
      .then((res) => res.data)
      .catch((err) => {
        alert(err.response.data.message)
      })
    return response
  },
}
