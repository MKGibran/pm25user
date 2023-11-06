import {
  cilAddressBook,
  cilArrowThickToRight,
  cilAudio,
  cilCloudy,
  cilFire,
  cilHome,
  cilInfo,
  cilPencil,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Log-In',
    to: '/log-in',
    icon: <CIcon icon={cilArrowThickToRight} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  {
    component: CNavItem,
    name: 'Sign-Up',
    to: '/sign-up',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  {
    component: CNavItem,
    name: 'About',
    to: '/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  {
    component: CNavItem,
    name: 'Fire data',
    to: '/fire-data',
    icon: <CIcon icon={cilFire} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  {
    component: CNavItem,
    name: 'Air pollution',
    to: '/air-pollution',
    icon: <CIcon icon={cilCloudy} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  {
    component: CNavItem,
    name: 'Hotspot',
    to: '/hotspot',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  {
    component: CNavItem,
    name: 'Smoke',
    to: '/smoke',
    icon: <CIcon icon={cilCloudy} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Report a fire',
  //   to: '/report-fire',
  //   icon: <CIcon icon={cilPaperPlane} customClassName="nav-icon" style={{ color: '#fff' }} />,
  // },
  {
    component: CNavItem,
    name: 'Useful contacts',
    to: '/useful-contacts',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" style={{ color: '#fff' }} />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" style={{ color: '#fff' }} />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
]

export default _nav
