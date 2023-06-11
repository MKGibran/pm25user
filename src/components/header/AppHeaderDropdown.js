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
import { cilAccountLogout, cilCaretBottom } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { userActions, userLogout } from 'src/models/redux/actions/userActions'
import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = (props) => {
  const dispatch = useDispatch()
  return (
    <CDropdown variant="nav-item" className="text-light">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <span style={{ color: '#fff' }} className="mx-2">
          {props.user.full_name}
        </span>
        <CIcon icon={cilCaretBottom} style={{ color: '#fff' }} size="sm" className="me-2" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-2" placement="bottom-end">
        <CDropdownItem onClick={() => dispatch(userLogout())}>
          <CIcon icon={cilAccountLogout} className="me-2" style={{ rotate: '180deg' }} />
          <span style={{ rotate: '180deg', cursor: 'pointer' }}>Logout</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
