import React from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLocationPin } from '@coreui/icons'
import PmValueIndicator from 'src/views/widgets/WPmValueIndicator'

const Home = (props) => {
  return (
    <div>
      <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>Fire Data</h4>
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
        <CRow xs={{ gutterX: 3 }}>
          <CCol>
            <CCard style={{ marginBottom: '2%', textAlign: 'center' }} className={`border-light`}>
              <CContainer>
                <CCardBody>
                  <h4>Air Pollution Level</h4>
                  <PmValueIndicator value={7} severity="normal" />
                </CCardBody>
              </CContainer>
            </CCard>
          </CCol>
          <CCol>
            <CCard style={{ marginBottom: '2%', textAlign: 'center' }} className={`border-light`}>
              <CContainer>
                <CCardBody>
                  <h4>Carbon Monoxide Level</h4>
                  <h1>20</h1>
                </CCardBody>
              </CContainer>
            </CCard>
          </CCol>
          <CCol>
            <CCard
              style={{
                marginBottom: '2%',
                textAlign: 'center',
              }}
              className={`border-light`}
            >
              <CContainer>
                <CCardBody>
                  <h4>Number of Hotspot</h4>
                  <PmValueIndicator value={8} severity="normal" />
                </CCardBody>
              </CContainer>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Home
