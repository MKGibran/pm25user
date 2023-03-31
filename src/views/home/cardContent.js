import React from 'react'
import { CCard, CCardBody } from '@coreui/react'

const cardContent = (props) => {
  return (
    <CCard>
      <CCardBody style={{ textAlign: 'center' }}>
        <h4>The fire safety database is here to help you protect Indonesia</h4>
      </CCardBody>
    </CCard>
  )
}

export default cardContent
