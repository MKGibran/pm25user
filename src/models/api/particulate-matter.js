import axios, { BASE_URL_API, HEADERS_API_BEARER, paramsSerializer } from './config'
// import { DashboardRes } from '../models'
import { format } from 'date-fns'
import dateHelper, { DATE_FORMAT } from '../../utils/helper/dateHelper'

const switchTypeDashboard = (type) => {
  switch (type) {
    case 'pm': {
      return 'particulate-matter'
    }
    case 'hotspot': {
      return 'hotspot'
    }
    case 'smoke': {
      return 'smoke'
    }
    default:
      return 'particulate-matter'
  }
}

const getDataPM = async (query) => {
  const response = await axios
    .get(BASE_URL_API + '/particulate-matter?' + paramsSerializer(query), HEADERS_API_BEARER())
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
}

const postInputData = async (props, type) => {
  const dateFinal =
    type === 'hotspot'
      ? format(props.date, DATE_FORMAT)
      : dateHelper.postDateTime(props.date, {
          val: props.time,
          timezone: props.timezone,
        })

  const response = await axios
    .post(
      BASE_URL_API + `/admin/${switchTypeDashboard(type)}`,
      {
        datetime: type !== 'hotspot' ? dateFinal : undefined,
        date: type === 'hotspot' ? dateFinal : undefined,
        value: props.value,
        village_code: props.village_code,
      },
      HEADERS_API_BEARER(),
    )
    .then((res) => {
      return {
        state: true,
        message: res.data.message,
        severity: 'success',
      }
    })
    .catch((error) => {
      console.error(error.response.data.message)
      return {
        state: true,
        message: error.response.data.message.toString(),
        severity: 'error',
      }
    })
  return response
}

const editInputData = async (id, props, type) => {
  const dateFinal =
    type === 'hotspot'
      ? format(props.date, DATE_FORMAT)
      : dateHelper.postDateTime(props.date, {
          val: props.time,
          timezone: props.timezone,
        })

  const response = await axios
    .put(
      BASE_URL_API + `/admin/${switchTypeDashboard(type)}/${id}`,
      {
        datetime: type !== 'hotspot' ? dateFinal : undefined,
        date: type === 'hotspot' ? dateFinal : undefined,
        value: props.value,
        village_code: props.village_code,
      },
      HEADERS_API_BEARER(),
    )
    .then((res) => {
      return {
        state: true,
        message: res.data.message,
        severity: 'success',
      }
    })
    .catch((error) => {
      console.error(error.response.data.message)
      return {
        state: true,
        message: error.response.data.message.toString(),
        severity: 'error',
      }
    })
  return response
}

const deleteDataPM = async (id) => {
  const response = await axios
    .delete(BASE_URL_API + '/admin/particulate-matter/' + id, HEADERS_API_BEARER())
    .then((res) => {
      return {
        state: true,
        severity: 'success',
        message: res.data.message,
      }
    })
    .catch((error) => {
      console.error(error.response.data.message)
      return {
        state: true,
        severity: 'error',
        message: error.response.data.message,
      }
    })
  return response
}

export default {
  getDataPM,
  postInputData,
  deleteDataPM,
  editInputData,
}
