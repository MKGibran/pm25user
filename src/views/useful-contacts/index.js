import React from 'react'
import { CCard, CCardBody, CContainer, CCardHeader } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const FireData = (props) => {
  return (
    <div>
      <CCard style={{ marginBottom: '2%' }}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>Useful Contacts</h4>
          </CCardBody>
        </CContainer>
      </CCard>

      <CCard style={{ marginBottom: '2%' }}>
        <CCardHeader>
          <h4>Here is a list of useful contacts for your region in the event of a fire</h4>
        </CCardHeader>
        <CContainer>
          <CCardBody>
            <p>0878-0000-0000</p>
          </CCardBody>
        </CContainer>
      </CCard>
    </div>
  )
}

export default FireData
