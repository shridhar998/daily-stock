// // components/LineChart.js

// import React from 'react';
// import { Line } from 'react-chartjs-2';

// const LineChart = ({ data }) => {
//   const chartData = {
//     labels: data.map(entry => entry.date),
//     datasets: [
//       {
//         label: 'Jewellery Sales (gms)',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: data.map(entry => entry.sale),
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         type: 'category',
//         labels: data.map(entry => entry.date),
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Sale (gms)',
//         },
//       },
//     },
//   };
  
//   return (
//     <div className="max-w-screen-md mx-auto mt-8">
//       <Line data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// export default LineChart;
import React from 'react'

const LineChart = () => {
  return (
    <div>LineChart</div>
  )
}

export default LineChart
