/* eslint-disable react/prop-types */
import React from 'react'
import {} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const Chart = (props) => {
  console.log(props)
  return (
    <CChart
      // style={{ width: '90%' }}
      className="mb-5"
      type="bar"
      data={{
        labels: props.dates,
        datasets: [
          {
            label: 'Air Pollution',
            backgroundColor: 'rgb(72, 156, 193)',
            data: props.values,
          },
        ],
      }}
      labels="Tanggal"
    />
  )
}

export default Chart
