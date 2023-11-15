/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import InformationApi from '../../models/api/information'
import PmValueIndicator from 'src/views/widgets/WPmValueIndicator'

const Level = (props) => {
  const user = props.user.user
  const [information, setInformation] = useState([])
  const [status, setStatus] = useState([])
  const [pmSeverity, setPmSeverity] = useState([])
  const fetchInformationData = () => {
    InformationApi.getDataInformation(user.village_code).then((response) => {
      if (response.particulate_matter != null) {
        setInformation(response.particulate_matter)
        setStatus(information.particulate_matter.status.status)
        if (information.particulate_matter.value > 300) {
          information.pmSeverity = { value: 'very-dangerous' }
          setPmSeverity(information.pmSeverity)
        } else if (information.particulate_matter.value > 200) {
          information.pmSeverity = { value: 'dangerous' }
          setPmSeverity(information.pmSeverity)
        } else if (information.particulate_matter.value > 100) {
          information.pmSeverity = { value: 'severe' }
          setPmSeverity(information.pmSeverity)
        } else if (information.particulate_matter.value > 50) {
          information.pmSeverity = { value: 'abnormal' }
          setPmSeverity(information.pmSeverity)
        } else if (information.particulate_matter.value > 0) {
          information.pmSeverity = { value: 'normal' }
          setPmSeverity(information.pmSeverity)
        }
      } else {
        setInformation(0)
        setPmSeverity({ value: 'normal' })
        setStatus(0)
      }
    })
  }
  useEffect(() => {
    fetchInformationData()
  }, [])
  return (
    <CCard style={{ marginBottom: '2%' }} className={`border-light`}>
      <CContainer>
        <h5 className={`m-3`}>Current Level</h5>
        <CCardBody>
          <CRow>
            <CCol>
              <CRow style={{ align: 'start' }}>
                <PmValueIndicator
                  value={information.value}
                  severity={pmSeverity.value}
                  className={`m-0`}
                />
              </CRow>
              <CRow>
                <h6>
                  Level {information.value} is equivalent to {status} 
                </h6>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CContainer>
    </CCard>
  )
}

export default Level
