/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {} from "@coreui/react"
import { CChart } from "@coreui/react-chartjs"

const Chart = (props) => {
  return (
    <>
      <CChart
        type="line"
        style={{ height: "300px" }}
        data={{
          labels: props.dates.reverse(),
          datasets: [
            {
              label: "Air Pollution",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "rgba(46, 184, 92)",
              pointBackgroundColor: "rgba(46, 184, 92)",
              pointBorderColor: "#fff",
              data: props.values.reverse(),
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
