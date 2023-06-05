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
} from '@coreui/react'
import { cilZoomIn } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Chart from './chart'
import Filter from './filter'
import { cilLocationPin } from '@coreui/icons'
import AirPollutionApi from '../../models/api/air-pollution'
import dayjs from 'dayjs'

const Home = (props) => {
  const [data, setData] = useState([])
  const [date, setDate] = useState([])
  const [value, setValue] = useState([])
  useEffect(() => {
    AirPollutionApi.getDataPM()
      .then((response) => {
        setData(response.data)
        const dates = []
        const values = []
        response.data.forEach((data, index) => {
          dates.push(dayjs(data.datetime).format('MM-DD-YYYY'))
          values.push(data.value)
        })
        setDate(dates)
        setValue(values)
      })
      .catch((error) => console.error(error))
  }, [])

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
              <CCol>Logo</CCol>
              <CCol>Logo</CCol>
              <CCol>Logo</CCol>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>

      <CContainer style={{ marginBottom: '1%' }}>
        <CRow>
          <CCol>
            <h5>
              <CIcon icon={cilLocationPin} size="xl" style={{ marginRight: '1%' }} />
              Kecamatan, Kelurahan, Provinsi
            </h5>
          </CCol>
          <CCol>
            <CButton color="success" style={{ color: '#fff', float: 'right' }}>
              Change location
            </CButton>
          </CCol>
        </CRow>
      </CContainer>

      <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
        <CCardBody style={{ textAlign: 'center' }}>
          <CRow>
            <CCol>
              <CRow>
                <h4>The current air pollution level in your commune is</h4>
                <h1>8</h1>
              </CRow>
            </CCol>
            <CCol>
              <CContainer>
                <CRow>
                  <CCard
                    style={{
                      marginBottom: '2%',
                      backgroundColor: 'rgb(72, 156, 193)',
                      color: '#FFF',
                    }}
                    className={`rounded-5 border-light`}
                  >
                    <CCardBody style={{ textAlign: 'left' }}>
                      <h4>What does this mean ?</h4>
                    </CCardBody>
                  </CCard>
                </CRow>
                <CRow>
                  <CCard
                    style={{
                      marginBottom: '2%',
                      backgroundColor: 'rgb(72, 156, 193)',
                      color: '#FFF',
                    }}
                    className={`rounded-5 border-light`}
                  >
                    <CCardBody style={{ textAlign: 'left' }}>
                      <h4>Level 8 is equivalent to smoking X cigarettes </h4>
                    </CCardBody>
                  </CCard>
                </CRow>
              </CContainer>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
        <CCardHeader>
          <h4>Daily Air Pollution (PM 2.5) for last 14 days</h4>
        </CCardHeader>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow>
              <Chart dates={date} values={value} />
            </CRow>
            <CRow>
              <CContainer>
                <Filter />
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
                    {data.map((item) => {
                      if (item.value < 25) {
                        item.status = 'good'
                        item.statusColor = 'primary'
                      } else if (item.value >= 25 && item.value <= 50) {
                        item.status = 'fair'
                        item.statusColor = 'warning'
                      } else if (item.value >= 50 && item.value <= 100) {
                        item.status = 'poor'
                        item.statusColor = 'primary'
                      } else if (item.value >= 100 && item.value <= 300) {
                        item.status = 'very poor'
                        item.statusColor = 'primary'
                      } else {
                        item.status = 'extremely poor'
                        item.statusColor = 'danger'
                      }
                      return (
                        <CTableRow key={item.id}>
                          <CTableDataCell>
                            {dayjs(item.datetime).format('MM-DD-YYYY')}
                          </CTableDataCell>
                          <CTableDataCell>{dayjs(item.datetime).format('HH:mm')}</CTableDataCell>
                          <CTableDataCell>{item.province.name}</CTableDataCell>
                          <CTableDataCell>{item.city.name}</CTableDataCell>
                          <CTableDataCell>{item.district.name}</CTableDataCell>
                          <CTableDataCell>{item.village.name}</CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {item.value}
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            <CBadge color={item.statusColor} shape="rounded-pill">
                              {item.status}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {item.value}
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            <CButton color="dark" variant="ghost" size="sm" className={'mx-1'}>
                              <CIcon icon={cilZoomIn} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })}
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
