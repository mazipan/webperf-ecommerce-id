import React from 'react';
import Chart from 'react-apexcharts';

const ChartTimeline = ({ data, title, dataKey }): React.ReactElement => {
  const series = [
    {
      name: 'Mobile',
      data: data.map((item) => {
        return {
          x: item.date,
          y: parseInt((item.m[dataKey] * 100).toFixed(0), 10),
        };
      }),
    },
    {
      name: 'Desktop',
      data: data.map((item) => {
        return {
          x: item.date,
          y: parseInt((item.d[dataKey] * 100).toFixed(0), 10),
        };
      }),
    },
  ];

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      max: 100,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#4299e1', '#48bb78'],
  };

  return (
    <>
      <div className="text-gray-600">{title}</div>
      <Chart options={options} series={series} width="100%" />
    </>
  );
};

export default ChartTimeline;
