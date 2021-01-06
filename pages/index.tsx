import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import HomeData from '../components/HomeData';
import Layout from '../components/Layout';
import DeviceChooser from '../components/DeviceChooser';

import reports from '../reports/output';
import dataEcommerce from '../constants/ecommerce';
import { EcommerceItem } from '../types';

const Home = ({ lastReport, lastUpdate }): React.ReactElement => {
  const [showDevice, setShowDevice] = useState('desktop');
  const [sortedReport, setSortedReport] = useState(lastReport);

  const handleChangeDevice = (newDevice) => {
    setShowDevice(newDevice);
    const key = newDevice === 'desktop' ? 'd' : 'm';
    const sorted = lastReport.length > 0 ? lastReport.sort((a, b) => b[key].perf - a[key].perf) : [];
    setSortedReport(sorted);
  };

  return (
    <Layout>
      <h3 className="text-gray-900 text-xl font-bold">Last updated on {lastUpdate}</h3>

      <DeviceChooser activeDevice={showDevice} onChangeDevice={handleChangeDevice} />

      {sortedReport.map((item) => (
        <Link href={`/${item.n.toLowerCase()}`} key={item.n}>
          <a href={`/${item.n.toLowerCase()}`}>
            <div className="mt-4 p-4 bg-white shadow overflow-hidden rounded-lg">
              <img className="h-10 w-auto rounded" src={item.logo} alt={item.n} />
              <div className="flex justify-start">
                {showDevice === 'desktop' ? (
                  <HomeData data={item} title="Desktop" keyNow="d" keyPrev="dPrev" />
                ) : (
                  <HomeData data={item} title="Mobile" keyNow="m" keyPrev="mPrev" />
                )}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const reportDates = Object.keys(reports) || [];
  const lastDate = reportDates[reportDates.length - 1] || '';
  const prevDate = reportDates[reportDates.length - 2] || '';

  const lastReport = reports[lastDate] || [];
  const prevReport = reports[prevDate] || [];
  const lastReportSorted = lastReport.length > 0 ? lastReport.sort((a, b) => b.d.perf - a.d.perf) : [];

  const findPrevReport = (n: string) => {
    return prevReport.find((report) => report.n === n);
  };

  const findCommerce = (name) =>
    dataEcommerce.find((i: EcommerceItem) => i.name.toLowerCase() === name.toLowerCase()) || { logo: '' };

  const mergeWithPrev = lastReportSorted.map((item: any) => {
    const pReport = findPrevReport(item.n);
    const commerce = findCommerce(item.n);
    return {
      ...item,
      logo: commerce.logo,
      mPrev: pReport.m,
      dPrev: pReport.d,
    };
  });

  return { props: { lastReport: mergeWithPrev, lastUpdate: lastDate } };
};

export default Home;
