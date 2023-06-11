import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import InformationApi from '../../models/api/information'
import PmValueIndicator from 'src/views/widgets/WPmValueIndicator'

const Level = (props) => {
  const user = props.user.user
  const [information, setInformation] = useState([])
  const [status, setStatus] = useState([])
  const fetchInformationData = () => {
    InformationApi.getDataInformation(user.village_code)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        setInformation(data.smoke)
        setStatus(data.smoke.status.status)
      })
  }
  useEffect(() => {
    fetchInformationData()
  }, [])
  return (
    <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
      <CCardBody style={{ textAlign: 'center' }}>
        <CRow>
          <CCol>
            <CRow>
              <h5 className={`mb-3`}>The current smoke level in your commune is</h5>
              <PmValueIndicator value={information.value} severity="normal" className={`my-5`} />
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
                    <h4>
                      Level {information.value} is equivalent to {status} 
                    </h4>
                  </CCardBody>
                </CCard>
              </CRow>
            </CContainer>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Level
