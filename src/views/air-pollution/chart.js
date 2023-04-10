import React from 'react'
import {} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const Chart = (props) => {
  return (
    <CChart
      // style={{ width: '90%' }}
      className="mb-5"
      type="bar"
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: 'rgb(72, 156, 193)',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
          },
        ],
      }}
      labels="months"
    />
  )
}

export default Chart
