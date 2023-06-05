import axios, { paramsSerializer, BASE_URL_API, HEADERS_API_BEARER } from './config'
// import { DashboardRes } from '../models'
// import dateHelper, { DATE_FORMAT } from '../../utils/helper/dateHelper'
// import { format } from 'date-fns'

export default {
  async getDataPM(query) {
    const response = await axios
      .get(BASE_URL_API + '/admin/hotspot?' + paramsSerializer(query), HEADERS_API_BEARER())
      .then((res) => {
        return {
          data: res.data.data.data,
          meta: {
            from: res.data.data.from,
            last_page: res.data.data.last_page,
            to: res.data.data.to,
            total: res.data.data.total,
          },
        }
      })
      .catch((error) => console.error(error.response.data.message))
    return response
  },
}
