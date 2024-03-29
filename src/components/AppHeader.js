/* eslint-disable react/prop-types */
import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler, CNavItem } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeaderDropdown } from './header/index'

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  return (
    <CHeader
      position="sticky"
      style={{
        backgroundColor: 'rgb(130, 205, 71)',
      }}
    >
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <CIcon icon={cilMenu} size="lg" style={{ color: '#fff' }} />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {/* <CNavLink to="/dashboard" component={NavLink} style={{ color: '#fff' }}>
              {props.user.full_name}
            </CNavLink> */}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown user={props.user} />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
