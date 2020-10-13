import React from 'react';
import Chart from 'react-apexcharts';

const ChartTimeline = ({ data }): React.ReactElement => {
  const series = [
    {
      name: 'Mobile',
      data: data.map((item) => {
        return {
          x: item.date,
          y: parseInt((item.m.perf * 100).toFixed(0), 10),
        };
      }),
    },
    {
      name: 'Desktop',
      data: data.map((item) => {
        return {
          x: item.date,
          y: parseInt((item.d.perf * 100).toFixed(0), 10),
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
    <div className="mt-4 p-4 bg-white shadow overflow-hidden rounded-lg">
      <Chart options={options} series={series} width="100%" />
    </div>
  );
};

export default ChartTimeline;
