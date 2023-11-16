/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import InformationApi from "../../models/api/information"

const Level = (props) => {
  const user = props.user.user
  // const [information, setInformation] = useState([])
  // const [status, setStatus] = useState([])
  const [hotspotLowSeverity, setHotspotLowSeverity] = useState([])
  const [hotspotMediumSeverity, setHotspotMediumSeverity] = useState([])
  const [hotspotHighSeverity, setHotspotHighSeverity] = useState([])
  const fetchInformationData = () => {
    InformationApi.getDataInformation(user.village_code).then((response) => {
      if (response.data.hotspot != null) {
        setHotspotLowSeverity(response.data.hotspot.low_confidence_hotspot.value)
        setHotspotMediumSeverity(response.data.hotspot.medium_confidence_hotspot.value)
        setHotspotHighSeverity(response.data.hotspot.high_confidence_hotspot.value)
      } else {
        setHotspotLowSeverity("-")
        setHotspotMediumSeverity("-")
        setHotspotHighSeverity("-")
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
          <CRow className={""}>
            <CCol style={{ textAlign: "center" }} className={"mx-3"}>
              <button
                className={"btn btn-success rounded-pill p-3 text-white text-bold mb-2"}
                color={"success"}
                shape="rounded-pill"
              >
                {hotspotLowSeverity}
              </button>
              <p style={{ fontSize: "10pt" }} className={"text-secondary"}>
                Low
              </p>
            </CCol>
            <CCol style={{ textAlign: "center" }} className={"mx-3"}>
              <button
                className={"btn btn-warning rounded-pill p-3 text-white text-bold mb-2"}
                color={"warning"}
                shape="rounded-pill"
              >
                {hotspotMediumSeverity}
              </button>
              <p style={{ fontSize: "10pt" }} className={"text-secondary"}>
                Medium
              </p>
            </CCol>
            <CCol style={{ textAlign: "center" }} className={"mx-3"}>
              <button
                className={"btn btn-danger rounded-pill p-3 text-white text-bold mb-2"}
                color={"danger"}
                shape="rounded-pill"
              >
                {hotspotHighSeverity}
              </button>
              <p style={{ fontSize: "10pt" }} className={"text-secondary"}>
                High
              </p>
            </CCol>
          </CRow>
        </CCardBody>
      </CContainer>
    </CCard>
  )
}

export default Level
