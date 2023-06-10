/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react'
import {} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

const Chart = (props) => {
  return (
    <>
      <CChartBar
        style={{ height: '300px' }}
        data={{
          labels: props.dates,
          datasets: [
            {
              label: 'Air Pollution',
              backgroundColor: 'rgb(72, 156, 193)',
              data: props.values,
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </>
  )
}

export default Chart
