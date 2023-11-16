/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import PmValueIndicator from "src/views/widgets/WPmValueIndicator"
import InformationApi from "../../models/api/information"

const Level = (props) => {
  const user = props.user.user
  const [information, setInformation] = useState([])
  const [status, setStatus] = useState([])
  const [pmSeverity, setPmSeverity] = useState([])
  const fetchInformationData = () => {
    InformationApi.getDataInformation(user.village_code).then((response) => {
      if (response.data.particulate_matter !== null) {
        setInformation(response.data.particulate_matter)
        setStatus(response.data.particulate_matter.status.status)
        if (response.data.particulate_matter.value <= 10) {
          setPmSeverity("normal")
        } else if (response.data.particulate_matter.value <= 25) {
          setPmSeverity("abnormal")
        } else if (response.data.particulate_matter.value <= 50) {
          setPmSeverity("severe")
        } else if (response.data.particulate_matter.value <= 75) {
          setPmSeverity("dangerous")
        } else if (response.data.particulate_matter.value > 75) {
          setPmSeverity("very-dangerous")
        }
      } else {
        setInformation({ value: "-" })
        setPmSeverity("normal")
        setStatus(0)
      }
    })
  }
  useEffect(() => {
    fetchInformationData()
  }, [])
  return (
    <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
      <CContainer>
        <h5 className={"m-3"}>Current Level</h5>
        <CCardBody>
          <CRow>
            <CCol style={{ textAlign: "center" }}>
              <CRow className={"mb-4"}>
                <PmValueIndicator value={information.value} severity={pmSeverity} />
              </CRow>
              <CRow>
                <h6>This level is equivalent to {status} </h6>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CContainer>
    </CCard>
  )
}

export default Level
