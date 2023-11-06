/* eslint-disable react/prop-types */
import { cilLocationPin, cilZoomIn } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import isObjectEmpty from 'src/utils/helper/checkObjIsEmpty'
import ToTitleCase from 'src/utils/helper/toTitleCase'
import ipb from '../../assets/images/Logo IPB.png'
import ubi from '../../assets/images/Logo Udara Bersih Indonesia.jpeg'
import sea from '../../assets/images/Logo-RFMRC-SEA-Terbaru.png'
import SmokeApi from '../../models/api/smoke'
import Chart from './chart'
import Level from './level'

const Home = (props) => {
  const user = props.user || {}
  const region = props.user.region || {}
  const [data, setData] = useState([])
  const [date, setDate] = useState([])
  const [value, setValue] = useState([])

  const getData = () => {
    const endDate = dayjs(new Date()).format('YYYY-MM-DDThh:mm:ss')
    const startDate = dayjs('2022-09-26').subtract(14, 'day').format('YYYY-MM-DDThh:mm:ss')
    SmokeApi.getDataSmoke({
      startDate: startDate,
      endDate: endDate,
      villageCode: isObjectEmpty(region) || !region.length ? undefined : region?.village.code,
      sortBy: 'id',
      sortOrder: 'desc',
    })
      .then((response) => {
        return response
      })
      .then((data) => {
        setData(data.data)
        const dates = []
        const values = []
        data.data.forEach((data, index) => {
          dates.push(dayjs(data.datetime).format('MM-DD-YYYY'))
          values.push(data.value)
        })
        setDate(dates)
        setValue(values)
      })
      .catch((error) => console.error(error))
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <CCard style={{ marginBottom: '2%' }} className={'border-light'}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>Smoke</h4>
          </CCardBody>
        </CContainer>
      </CCard>

      <CCard style={{ marginBottom: '2%', textAlign: 'justify' }} className={'border-light'}>
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
          {isObjectEmpty(region) || !region.length ? (
            <>Please login and/or select region</>
          ) : (
            <CCol>
              <p>
                <CIcon icon={cilLocationPin} size="sm" style={{ marginRight: '1%' }} />
                {region?.village.name}, {region?.district.name}, {region?.province.name}
              </p>
            </CCol>
          )}
        </CRow>
      </CContainer>

      {isObjectEmpty(user.user) ? <></> : <Level user={user} />}

      <CCard style={{ marginBottom: '2%' }} className={'border-light'}>
        <CCardHeader>
          <h4>Daily Smoke for the last 14 days</h4>
        </CCardHeader>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow className={'mb-5'}>
              <Chart dates={date} values={value} />
            </CRow>
            <CRow>
              <CContainer>
                <CRow>
                  <CCol style={{ textAlign: 'left' }}>
                    <h5>List Data Smoke</h5>
                  </CCol>
                  {/* <CCol>
                    <CButton color="light" style={{ float: 'right' }}>
                      Date Range
                    </CButton>
                  </CCol> */}
                </CRow>

                {/* <CRow>
                  <CForm className="my-4">
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
                            <CFormInput type="text" id="Provinsi" />
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
                            <CFormInput type="text" id="Kabupaten/Kota" />
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
                            <CFormInput type="text" id="Kecamatan" />
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
                            <CFormInput type="text" id="Kelurahan/Desa" />
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Tanggal"
                            className="col-sm-2 col-form-label text-start"
                          >
                            Tanggal
                          </CFormLabel>
                          <CCol sm={8}>
                            <CFormInput type="date" id="Tanggal" />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel
                            htmlFor="Waktu"
                            className="col-sm-2 col-form-label text-start"
                          >
                            Waktu
                          </CFormLabel>
                          <CCol sm={4}>
                            <CFormInput type="time" id="Waktu" />
                          </CCol>
                          <CCol sm={4}>
                            <CFormInput type="time" id="Waktu" />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol sm={10}>
                            <CButton color="success" style={{ color: '#fff', float: 'right' }}>
                              Cari
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CForm>
                </CRow> */}
                <CTable responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Waktu</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Provinsi</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kab/Kota</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kecamatan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Keluarahan/Desa</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nilai</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hotspot</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody style={{ textAlign: 'left' }}>
                    {data.length ? (
                      data.map((item) => {
                        if (item.value < 25) {
                          item.status = 'good'
                          item.statusColor = 'primary'
                        } else if (item.value >= 25 && item.value <= 50) {
                          item.status = 'fair'
                          item.statusColor = 'success'
                        } else if (item.value >= 50 && item.value <= 100) {
                          item.status = 'poor'
                          item.statusColor = 'warning'
                        } else if (item.value >= 100 && item.value <= 300) {
                          item.status = 'very poor'
                          item.statusColor = 'danger'
                        } else {
                          item.status = 'extremely poor'
                          item.statusColor = 'dark'
                        }
                        return (
                          <CTableRow key={item.id}>
                            <CTableDataCell>{dayjs(item.datetime).format('MM-DD-YYYY')}</CTableDataCell>
                            <CTableDataCell>{dayjs(item.datetime).format('HH:mm')}</CTableDataCell>
                            <CTableDataCell>{ToTitleCase(item.province.name)}</CTableDataCell>
                            <CTableDataCell>{ToTitleCase(item.city.name)}</CTableDataCell>
                            <CTableDataCell>{ToTitleCase(item.district.name)}</CTableDataCell>
                            <CTableDataCell>{ToTitleCase(item.village.name)}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{item.value}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                              <CBadge color={item.statusColor} shape="rounded-pill">
                                {item.status}
                              </CBadge>
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{item.value}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                              <CButton color="dark" variant="ghost" size="sm" className={'mx-1'}>
                                <CIcon icon={cilZoomIn} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })
                    ) : (
                      <>No data found!</>
                    )}
                  </CTableBody>
                </CTable>
              </CContainer>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>
    </div>
  )
}

export default Home
