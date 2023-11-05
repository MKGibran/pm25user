/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { cilZoomIn, cilLocationPin } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Chart from './chart'
import Level from './level'
import dayjs from 'dayjs'
import ParticulateMatterApi from '../../models/api/particulate-matter'
import regionApi from '../../models/api/region'
import { Controller, useForm } from 'react-hook-form'
import WFormSelect from '../widgets/WFormSelect'
import isObjectEmpty from 'src/utils/helper/checkObjIsEmpty'
import ToTitleCase from 'src/utils/helper/toTitleCase'
import ipb from '../../assets/images/Logo IPB.png'
import ubi from '../../assets/images/Logo Udara Bersih Indonesia.jpeg'
import sea from '../../assets/images/Logo-RFMRC-SEA-Terbaru.png'

const AirPollution = (props) => {
  const { register, control, handleSubmit } = useForm()
  const user = props?.user || {}
  const region = props?.user?.region || {}
  const [data, setData] = useState([])
  const [date, setDate] = useState([])
  const [value, setValue] = useState([])

  const getData = (formData) => {
    const endDate =
      dayjs(new Date()).format('YYYY-MM-DDThh:mm:ss') ||
      dayjs(formData.endDate).format('YYYY-MM-DDThh:mm:ss')
    const startDate =
      dayjs('2022-09-26').subtract(14, 'day').format('YYYY-MM-DDThh:mm:ss') ||
      dayjs(formData.startDate).format('YYYY-MM-DDThh:mm:ss')
    const villageCode = formData?.village_code || region?.village?.code
    ParticulateMatterApi.getDataPM({
      startDate: startDate,
      endDate: endDate,
      villageCode: villageCode ?? undefined,
      sortBy: 'id',
      sortOrder: 'desc',
    })
      .then((response) => response.data)
      .then((data) => {
        setData(data)
        const dates = []
        const values = []
        data?.forEach((data, index) => {
          dates.push(dayjs(data?.datetime).format('MM-DD-YYYY'))
          values.push(data?.value)
        })
        setDate(dates)
        setValue(values)
        setFetching(false)
      })
      .catch((error) => console.error(error))
  }

  const [provinceData, setProvinceData] = useState([{}])
  const [citiesData, setCitiesData] = useState([{}])
  const [districtData, setDistrictData] = useState([{}])
  const [villageData, setVillageData] = useState([{}])

  useEffect(() => {
    getData({})
    regionApi.getProvinces().then((res) => setProvinceData(res))
  }, [])
  const onSubmit = (formData) => {
    setFetching(true)
    getData(formData)
  }

  const [fetching, setFetching] = useState(false)

  return (
    <div>
      <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>Air Pollution (PM 2.5)</h4>
          </CCardBody>
        </CContainer>
      </CCard>

      <CCard style={{ marginBottom: '2%', textAlign: 'justify' }} className={`border-light`}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow>
              <CCol>
                <CImage fluid src={ipb} width={100} />
              </CCol>
              <CCol>
                <CImage fluid src={ubi} width={100} />
              </CCol>
              <CCol>
                <CImage fluid src={sea} width={100} />
              </CCol>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>

      <CContainer style={{ marginBottom: '1%' }}>
        <CRow>
          <CCol>
            {!isObjectEmpty(region) ? (
              <p>
                <CIcon icon={cilLocationPin} size="sm" style={{ marginRight: '1%' }} />
                {region?.village?.name}, {region?.district?.name}, {region?.province?.name}
              </p>
            ) : (
              <p>Please login and/or select region</p>
            )}
          </CCol>
        </CRow>
      </CContainer>

      {isObjectEmpty(user.user) ? <></> : <Level user={user} />}

      <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
        <CCardHeader>
          <h4>Daily Air Pollution (PM 2.5) for last 14 days</h4>
        </CCardHeader>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow className={`mb-5`}>
              <Chart dates={date} values={value} />
            </CRow>
            <CRow>
              <CContainer>
                <CRow>
                  <CCol style={{ textAlign: 'left' }}>
                    <h5>List Data PM 2.5</h5>
                  </CCol>
                  <CCol>
                    <CButton color="light" style={{ float: 'right' }}>
                      Date Range
                    </CButton>
                  </CCol>
                </CRow>

                <CRow>
                  <CForm className="my-4" onSubmit={handleSubmit(onSubmit)}>
                    <CRow>
                      <CCol>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Provinsi"
                            className="col-sm-4 col-form-label text-start"
                          >
                            Provinsi
                          </CFormLabel>
                          <CCol sm={6}>
                            <Controller
                              control={control}
                              name="province"
                              render={({ field: { onChange, value, ref } }) => (
                                <WFormSelect
                                  label="Province"
                                  inputRef={ref}
                                  data={provinceData}
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e)
                                    regionApi
                                      .getCities(e.target.value)
                                      .then((res) => setCitiesData(res))
                                  }}
                                  className="mb-2"
                                />
                              )}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Kabupaten/Kota"
                            className="col-sm-4 col-form-label text-start"
                          >
                            Kabupaten/Kota
                          </CFormLabel>
                          <CCol sm={6}>
                            <Controller
                              control={control}
                              name="cities"
                              render={({ field: { onChange, value, ref } }) => (
                                <WFormSelect
                                  label="Cities"
                                  inputRef={ref}
                                  data={citiesData}
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e)
                                    regionApi
                                      .getDistricts(e.target.value)
                                      .then((res) => setDistrictData(res))
                                  }}
                                  className="mb-2"
                                />
                              )}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Kecamatan"
                            className="col-sm-4 col-form-label text-start"
                          >
                            Kecamatan
                          </CFormLabel>
                          <CCol sm={6}>
                            <Controller
                              control={control}
                              name="district"
                              render={({ field: { onChange, value, ref } }) => (
                                <WFormSelect
                                  label="District"
                                  inputRef={ref}
                                  data={districtData}
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e)
                                    regionApi
                                      .getVillages(e.target.value)
                                      .then((res) => setVillageData(res))
                                  }}
                                  className="mb-2"
                                />
                              )}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Kelurahan/Desa"
                            className="col-sm-4 col-form-label text-start"
                          >
                            Kelurahan/Desa
                          </CFormLabel>
                          <CCol sm={6}>
                            <Controller
                              control={control}
                              name="village_code"
                              render={({ field: { onChange, value, ref } }) => (
                                <WFormSelect
                                  label="Village"
                                  inputRef={ref}
                                  data={villageData}
                                  value={value}
                                  onChange={onChange}
                                  className="mb-2"
                                />
                              )}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Waktu Awal"
                            className="col-sm-4 col-form-label text-start"
                          >
                            Waktu Awal
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              aria-label="Date"
                              type="datetime-local"
                              id="Tanggal"
                              name="startDate"
                              {...register('startDate')}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Waktu Akhir"
                            className="col-sm-4 col-form-label text-start"
                          >
                            Waktu Akhir
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              aria-label="Date"
                              type="datetime-local"
                              id="Tanggal"
                              name="endDate"
                              {...register('endDate')}
                            />
                          </CCol>
                        </CRow>

                        <CRow className="mb-3">
                          <CCol sm={10}>
                            <CButton
                              color="success"
                              style={{ color: '#fff', float: 'right' }}
                              type="submit"
                            >
                              <span className="mx-3">Cari</span>
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CForm>
                </CRow>
                <CTable responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Waktu</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Provinsi</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kab/Kota</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kecamatan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kelurahan/Desa</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nilai</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hotspot</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  {
                    <CTableBody style={{ textAlign: 'left' }}>
                      {data.length ? (
                        data.map((item) => {
                          if (item?.value < 25) {
                            item.status = 'good'
                            item.statusColor = 'primary'
                          } else if (item?.value >= 25 && item?.value <= 50) {
                            item.status = 'fair'
                            item.statusColor = 'success'
                          } else if (item?.value >= 50 && item?.value <= 100) {
                            item.status = 'poor'
                            item.statusColor = 'warning'
                          } else if (item?.value >= 100 && item?.value <= 300) {
                            item.status = 'very poor'
                            item.statusColor = 'danger'
                          } else {
                            item.status = 'extremely poor'
                            item.statusColor = 'dark'
                          }

                          if (fetching != false) {
                            return (
                              <div className="d-flex justify-content-center align-items-center vw-100">
                                <div className="spinner-border text-success" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>
                            )
                          } else {
                            return (
                              <CTableRow key={item.id}>
                                <CTableDataCell>
                                  {dayjs(item.datetime).format('MM-DD-YYYY')}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {dayjs(item.datetime).format('HH:mm')}
                                </CTableDataCell>
                                <CTableDataCell>{ToTitleCase(item.province.name)}</CTableDataCell>
                                <CTableDataCell>{ToTitleCase(item.city.name)}</CTableDataCell>
                                <CTableDataCell>{ToTitleCase(item.district.name)}</CTableDataCell>
                                <CTableDataCell>{ToTitleCase(item.village.name)}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                  {item?.value}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                  <CBadge color={item.statusColor} shape="rounded-pill">
                                    {item.status}
                                  </CBadge>
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                  {item?.value}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                  <CButton
                                    color="dark"
                                    variant="ghost"
                                    size="sm"
                                    className={'mx-1'}
                                  >
                                    <CIcon icon={cilZoomIn} />
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          }
                        })
                      ) : (
                        <>No data found!</>
                      )}
                    </CTableBody>
                  }
                </CTable>
              </CContainer>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>
    </div>
  )
}

export default AirPollution
