import React from 'react';
import Chart from 'react-apexcharts';

interface ChartProps {
  data: any[];
  title: string;
  dataKey: string;
}

const ChartTimeline = ({ data, title, dataKey }: ChartProps): React.ReactElement => {
  const series = [
    {
      name: 'Mobile',
      data: data.map((item) => {
        return {
          x: item.date,
          y: Math.round(item.m[dataKey] * 100),
        };
      }),
    },
    {
      name: 'Desktop',
      data: data.map((item) => {
        return {
          x: item.date,
          y: Math.round(item.d[dataKey] * 100),
        };
      }),
    },
  ];

  const options = {
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
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#84cc16', '#c026d3'],
  };

  return (
    <>
      <div className="text-gray-600">{title}</div>
      {/*
// @ts-ignore */}
      <Chart options={options} series={series} width="100%" type="line" />
    </>
  );
};

export default ChartTimeline;
