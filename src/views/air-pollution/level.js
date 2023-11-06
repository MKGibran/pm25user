/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import PmValueIndicator from 'src/views/widgets/WPmValueIndicator'
import InformationApi from '../../models/api/information'

const Level = (props) => {
  const user = props.user.user
  const [information, setInformation] = useState([])
  const [status, setStatus] = useState([])
  const [pmSeverity, setPmSeverity] = useState([])
  const fetchInformationData = () => {
    InformationApi.getDataInformation(user.village_code)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        setInformation(data.particulate_matter)
        setStatus(data.particulate_matter.status.status)
        if (data.particulate_matter.value > 300) {
          data.pmSeverity = { value: 'very-dangerous' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 200) {
          data.pmSeverity = { value: 'dangerous' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 100) {
          data.pmSeverity = { value: 'severe' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 50) {
          data.pmSeverity = { value: 'abnormal' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 0) {
          data.pmSeverity = { value: 'normal' }
          setPmSeverity(data.pmSeverity)
        }
      })
  }
  useEffect(() => {
    fetchInformationData()
  }, [])
  return (
    <CCard style={{ marginBottom: '2%' }} className={'border-light'}>
      <CCardBody style={{ textAlign: 'center' }}>
        <CRow>
          <CCol>
            <CRow>
              <h5 className={'mb-3'}>The current air pollution level in your commune is</h5>
              <PmValueIndicator value={information.value} severity={pmSeverity.value} className={'my-5'} />
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
                  className={'rounded-5 border-light'}
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
                  className={'rounded-5 border-light'}
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
