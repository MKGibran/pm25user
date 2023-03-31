import React from 'react'

const Home = React.lazy(() => import('./views/home/index'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', element: Home },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
