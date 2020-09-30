import React from 'react';
// import Link from 'next/link';
import Layout from '../components/Layout';
import reports from '../reports/output';

const getColorClass = (value): string => {
  if (value <= 0.49) {
    return 'text-red-600';
  }
  if (value <= 0.89) {
    return 'text-orange-500';
  }

  return 'text-green-500';
};

const Home = (): React.ReactElement => {
  const reportDates = Object.keys(reports) || [];
  const lastDate = reportDates[reportDates.length - 1] || '';
  const lastReport = reports[lastDate] || [];
  const lastReportSorted = lastReport.length > 0 ? lastReport.sort((a, b) => b.d.perf - a.d.perf) : [];

  return (
    <Layout>
      <h3 className="text-gray-900 text-xl font-bold">Last update {lastDate}</h3>

      {lastReportSorted.map((item) => (
        <div key={item.n} className="mt-4 p-4 bg-white shadow overflow-hidden rounded-lg">
          <h3 className="text-3xl font-bold capitalize">{item.n}</h3>
          <div className="flex justify-start">
            <div className="text-gray-400 my-2 mr-2">
              <small className="text-sm font-bold">Desktop</small>
              <div className={`text-5xl font-bold capitalize ${getColorClass(item.d.perf)}`}>
                {(item.d.perf * 100).toFixed(0)}
              </div>
            </div>
            <div className="text-gray-400 my-2 ml-2">
              <small className="text-sm font-bold">Mobile</small>
              <div className={`text-5xl font-bold capitalize ${getColorClass(item.m.perf)}`}>
                {(item.m.perf * 100).toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Home;
