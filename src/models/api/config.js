import axios from 'axios'
import store from '../redux/store'

// const BASE_URL = "https://backend-pm-25.herokuapp.com";
const BASE_URL = 'http://localhost:8010/proxy/'
// const BASE_URL = 'http://117.53.46.104:8179'
export const GET_CSRF_COOKIE = '/sanctum/csrf-cookie'
export const BASE_URL_API = '/api/v1'
export const TOKEN_NAME = '_ZEc5clpXNXpjdw'

export const HEADERS_API = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    Vary: 'Origin',
    Accept: 'application/json',
  },
}

const DEV_TOKEN = '78|tJw4ftynAoDipYstB13uagdWKK1foCl7OuDwilhz'

const HEADERS_API_BEARER = () => {
  const Cookies = require('js-cookie')

  return {
    headers: {
      ...HEADERS_API.headers,
      Authorization: `Bearer ${Cookies.get(TOKEN_NAME)}`,
    },
  }
}

// Create axios instance with base url and credentials support
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

const setCSRFToken = () => {
  return axiosInstance.get(GET_CSRF_COOKIE, HEADERS_API) // resolves to '/api/csrf-cookie'.
}

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
  const Cookies = require('js-cookie')
  console.log(!Cookies.get('XSRF-TOKEN'))
  // If http method is `post | put | delete` and XSRF-TOKEN cookie is
  // not present, call '/sanctum/csrf-cookie' to set CSRF token, then
  // proceed with the initial response
  if (
    (config.method?.toLowerCase() === 'post' ||
      config.method?.toLowerCase() === 'put' ||
      config.method?.toLowerCase() === 'delete') &&
    !Cookies.get('XSRF-TOKEN')
  ) {
    return setCSRFToken().then(() => config)
  } else return config
}

axiosInstance.interceptors.request.use(onRequest)

function paramsSerializer(params) {
  // "Hide" the `answer` param
  return Object.entries(Object.assign({}, params))
    .map(([key, value]) => {
      if (value !== undefined) return `${key}=${value}`
    })
    .join('&')
}

export default axiosInstance
// export { HEADERS_API_BEARER, paramsSerializer }
export { DEV_TOKEN, HEADERS_API_BEARER, paramsSerializer }
