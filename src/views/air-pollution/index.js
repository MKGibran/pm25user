import React from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLocationPin } from '@coreui/icons'

const Home = (props) => {
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

      <CContainer>
        <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow>
              <CCol>
                <CRow>
                  <h4>Air Pollution Level</h4>
                  <h1>8</h1>
                </CRow>
              </CCol>
              <CCol>
                <CContainer>
                  <CRow>
                    <CCard style={{ marginBottom: '2%' }} className={`rounded-5 border-light`}>
                      <CCardBody style={{ textAlign: 'center' }}>
                        <h4>What does this mean ?</h4>
                      </CCardBody>
                    </CCard>
                  </CRow>
                  <CRow>
                    <CCard style={{ marginBottom: '2%' }} className={`rounded-5 border-light`}>
                      <CCardBody style={{ textAlign: 'center' }}>
                        <h4>Level 8 is equivalent to smoking X cigarettes </h4>
                      </CCardBody>
                    </CCard>
                  </CRow>
                </CContainer>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default Home
