import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilHome,
  cilFire,
  cilCloudy,
  cilAudio,
  cilPaperPlane,
  cilAddressBook,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Fire data',
    to: '/fire-data',
    icon: <CIcon icon={cilFire} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Air pollution',
    to: '/air-pollution',
    icon: <CIcon icon={cilCloudy} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Hotspot',
    to: '/hotspot',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Smoke',
    to: '/smoke',
    icon: <CIcon icon={cilCloudy} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Report a fire',
    to: '/report-fire',
    icon: <CIcon icon={cilPaperPlane} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Useful contacts',
    to: '/useful-contacts',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
