/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  CButton,
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
import CIcon from '@coreui/icons-react'
import Chart from './chart'
import Level from './level'
import dayjs from 'dayjs'
import { cilLocationPin, cilZoomIn } from '@coreui/icons'
import HotspotApi from '../../models/api/hotspot'
import regionApi from '../../models/api/region'

const Hotspot = (props) => {
  const user = props.user
  const region = props.user.region
  const [data, setData] = useState([])
  const [date, setDate] = useState([])
  const [value, setValue] = useState([])
  const getData = () => {
    HotspotApi.getDataHotspot()
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
      <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>Hotspot (PM 2.5)</h4>
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
            <p>
              <CIcon icon={cilLocationPin} size="sm" style={{ marginRight: '1%' }} />
              {region.village.name}, {region.district.name}, {region.province.name}
            </p>
          </CCol>
          <CCol>
            <CButton color="success" style={{ color: '#fff', float: 'right' }}>
              Change location
            </CButton>
          </CCol>
        </CRow>
      </CContainer>

      <Level user={user} />

      <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
        <CCardHeader>
          <h4>Daily Hotspot (PM 2.5) for last 14 days</h4>
        </CCardHeader>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow className={`mb-5`}>
              <Chart dates={date} values={value} />
            </CRow>
            <CRow>
              <CContainer>
                <CTable responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Waktu</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Provinsi</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kab/Kota</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kecamatan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Keluarahan/Desa</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hotspot</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody style={{ textAlign: 'left' }}>
                    {data.map((item) => {
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

export default Hotspot
