import axios, { BASE_URL_API } from './config'

export default {
  async getProvinces() {
    const response = await axios
      .get(BASE_URL_API + '/provinces')
      .then((res) => res.data.data)
      .catch((err) => console.error(err.message))
    return response
  },
  async getCities(idProv) {
    const response = await axios
      .get(BASE_URL_API + '/cities/' + idProv.toString())
      .then((res) => res.data.data)
      .catch((err) => console.error(err.message))
    return response
  },
  async getDistricts(idCity) {
    const response = await axios
      .get(BASE_URL_API + '/districts/' + idCity.toString())
      .then((res) => res.data.data)
      .catch((err) => console.error(err.message))
    return response
  },
  async getVillages(idDistricts) {
    const response = await axios
      .get(BASE_URL_API + '/villages/' + idDistricts.toString())
      .then((res) => res.data.data)
      .catch((err) => console.error(err.message))
    return response
  },
  async getVillage(idVillage) {
    const response = await axios
      .get(BASE_URL_API + '/village/' + idVillage.toString())
      .then((res) => res.data.data)
      .catch((err) => console.error(err.message))
    return response
  },
}
