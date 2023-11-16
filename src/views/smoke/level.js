import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import PmValueIndicator from "src/views/widgets/WPmValueIndicator"
import InformationApi from "../../models/api/information"

const Level = (props) => {
  const user = props.user.user
  const [information, setInformation] = useState([])
  const [status, setStatus] = useState([])
  const [smokeSeverity, setSmokeSeverity] = useState([])
  const fetchInformationData = () => {
    InformationApi.getDataInformation(user.village_code).then((response) => {
      if (response.data.smoke != null) {
        setInformation(response.data.smoke)
        setStatus(response.data.smoke.status.status)
        if (response.data.smoke.value <= 4400) {
          console.log(1)
          setSmokeSeverity("normal")
        } else if (response.data.smoke.value <= 9400) {
          setSmokeSeverity("abnormal")
        } else if (response.data.smoke.value <= 12400) {
          setSmokeSeverity("severe")
        } else if (response.data.smoke.value <= 15400) {
          setSmokeSeverity("dangerous")
        } else if (response.data.smoke.value > 15400) {
          setSmokeSeverity("very-dangerous")
        }
      } else {
        setInformation({ value: "-" })
        setSmokeSeverity("normal")
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
                <PmValueIndicator value={information.value} severity={smokeSeverity} />
              </CRow>
              <CRow>
                <h6>This level is equivalent to {status} </h6>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CContainer>
    </CCard>
  )
}

export default Level
