import React from 'react'

const Home = React.lazy(() => import('./views/home/index'))
const FireData = React.lazy(() => import('./views/fire-data/index'))
const SignUpPage = React.lazy(() => import('./views/sign-up/SignUpPage'))
const LogInPage = React.lazy(() => import('./views/log-in/index'))
const About = React.lazy(() => import('./views/about/index'))
const AirPollution = React.lazy(() => import('./views/air-pollution/index'))
const UsefulContacts = React.lazy(() => import('./views/useful-contacts/index'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', element: Home },
  { path: '/sign-up', name: 'SignUp', element: SignUpPage },
  { path: '/log-in', name: 'LogInPage', element: LogInPage },
  { path: '/about', name: 'About', element: About },
  { path: '/fire-data', name: 'FireData', element: FireData },
  { path: '/air-pollution', name: 'AirPollution', element: AirPollution },
  { path: '/useful-contacts', name: 'UsefulContacts', element: UsefulContacts },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
