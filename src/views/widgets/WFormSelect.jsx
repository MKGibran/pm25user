import { CFormSelect } from '@coreui/react'
import React from 'react'
import ToTitleCase from 'src/utils/helper/toTitleCase'

export default function WFormSelect({ label, data = [], ...rest }) {
  const optionsItem = data.map((item) => (
    <option value={item.code}>{ToTitleCase(item.name)}</option>
  ))

  return (
    <CFormSelect name={label.toLowerCase()} {...rest}>
      <option>{label}</option>
      {optionsItem}
    </CFormSelect>
  )
}
