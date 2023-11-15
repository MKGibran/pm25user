/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import PmValueIndicator from "src/views/widgets/WPmValueIndicator"
import InformationApi from "../../models/api/information"

const Level = (props) => {
  const user = props.user.user
  const [information, setInformation] = useState([])
  const [status, setStatus] = useState([])
  const fetchInformationData = () => {
    InformationApi.getDataInformation(user.village_code).then((response) => {
      if (response.hotspot != null) {
        setInformation(response.hotspot)
        setStatus(information.smoke.status.status)
      } else {
        setInformation(0)
        setStatus(0)
      }
    })
  }

  useEffect(() => {
    fetchInformationData()
  }, [])

  return (
    <CCard style={{ marginBottom: "2%" }} className={`border-light`}>
      <CContainer>
        <h5 className={`m-3`}>Current Level</h5>
        <CCardBody>
          <CRow>
            <CCol>
              <CRow style={{ align: "start" }}>
                <PmValueIndicator value={information.value} severity="normal" className={`m-0`} />
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
