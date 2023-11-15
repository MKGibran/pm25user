import axios, { BASE_URL_API } from './config'
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
