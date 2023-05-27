import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow, CButtonGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLocationPin } from '@coreui/icons'
import PmValueIndicator from 'src/views/widgets/WPmValueIndicator'
import FireDataApi from '../../models/api/fire-data'

export default function SignUpPage() {
  useEffect(() => {
    FireDataApi.getDataPM().then((res) => {
      console.log(res)
    })
  })

  return (
    <div>
      <CCard style={{ marginBottom: '2%' }}>
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
        <CRow xs={{ gutterX: 5 }}>
          <CCol>
            <CRow>
              <CCard style={{ marginBottom: '2%', textAlign: 'center' }}>
                <CContainer>
                  <CCardBody>
                    <h4>The current air pollution level in your commune is</h4>
                    <p>
                      Nilai partikel PM 2.5 <br />
                      (g/m2)
                    </p>
                    <PmValueIndicator value={7} severity="normal" />
                    <CButtonGroup role="group" aria-label="Basic example" className="mt-4">
                      <CButton color="success"></CButton>
                      <CButton color="warning"></CButton>
                      <CButton color="danger"></CButton>
                    </CButtonGroup>
                  </CCardBody>
                </CContainer>
              </CCard>
            </CRow>
          </CCol>
          <CCol>
            <CRow>
              <CCard
                style={{
                  marginBottom: '2%',
                  textAlign: 'center',
                }}
              >
                <CContainer>
                  <CCardBody>
                    <h4>The current number of hotspot in your commune is</h4>
                    <PmValueIndicator value={8} severity="normal" />
                  </CCardBody>
                </CContainer>
              </CCard>
            </CRow>
            <CRow>
              <CCard style={{ marginBottom: '2%', textAlign: 'center' }}>
                <CContainer>
                  <CCardBody>
                    <h4>The current carbon monoxide level in your commune is</h4>
                    <h1>20</h1>
                  </CCardBody>
                </CContainer>
              </CCard>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
