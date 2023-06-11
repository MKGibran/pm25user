/* eslint-disable react/prop-types */
import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = (props) => {
  return (
    <CDropdown variant="nav-item" className="text-light">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={true}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <span style={{ color: '#fff' }}>{props.user.full_name}</span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-2" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
