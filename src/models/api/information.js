/* eslint-disable import/no-anonymous-default-export */
import axios, { paramsSerializer, BASE_URL_API, HEADERS_API_BEARER } from './config'
// import { DashboardRes } from '../models'
// import dateHelper, { DATE_FORMAT } from '../../utils/helper/dateHelper'
// import { format } from 'date-fns'

export default {
  async getDataInformation(village_code) {
    const response = await axios
      .get(BASE_URL_API + '/information/' + village_code)
      .then((res) => {
        return {
          data: res.data.data,
        }
      })
      .catch((error) => console.error(error.response.data.message))
    return response
  },
}
