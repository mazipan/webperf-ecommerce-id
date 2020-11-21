import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';
import DesktopIcon from '../components/Icons/Desktop';
import PhoneIcon from '../components/Icons/Phone';
import CardDetail from '../components/CardDetail';

import reports from '../reports/output';
import dataEcommerce from '../constants/ecommerce';
import { EcommerceItem } from '../types';

const ChartTimeline = dynamic(() => import('../components/ChartTimeline'), { ssr: false });

const DetailPage = ({ data, allData, logo, lastUpdate }): React.ReactElement => {
  const [showDevice, setShowDevice] = useState('desktop');

  const handleChangeDevice = (newDevice) => {
    setShowDevice(newDevice);
  };

  return (
    <Layout>
      <img className="h-10 w-auto rounded" src={logo} alt={data.n} />
      <h1 className="text-3xl font-bold capitalize">Web Performance Result</h1>
      <small className="text-gray-600 text-lg font-bold">Last update {lastUpdate}</small>

      <div className="mt-4 flex">
        <div
          className={`mr-2 p-4 flex bg-white shadow overflow-hidden rounded-lg ${
            showDevice === 'desktop' ? '' : 'text-gray-600'
          }`}
          onClick={() => {
            handleChangeDevice('desktop');
          }}
        >
          <DesktopIcon />
          <span className="ml-2">Desktop</span>
        </div>
        <div
          className={`p-4 flex bg-white shadow overflow-hidden rounded-lg ${
            showDevice === 'mobile' ? '' : 'text-gray-600'
          }`}
          onClick={() => {
            handleChangeDevice('mobile');
          }}
        >
          <PhoneIcon />
          <span className="ml-2">Mobile</span>
        </div>
      </div>

      <CardDetail
        data={showDevice === 'desktop' ? data.d : data.m}
        title={showDevice === 'desktop' ? 'Desktop' : 'Mobile'}
      />
      <ChartTimeline data={allData} title="Performance Score" />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = dataEcommerce.map((i: EcommerceItem) => `/${i.name.toLowerCase()}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id: string = params ? `${params.id}` : '';
  const ecommerce: EcommerceItem | undefined = dataEcommerce.find(
    (i: EcommerceItem) => i.name.toLowerCase() === id.toLowerCase(),
  );

  const reportDates: string[] = Object.keys(reports) || [];
  const lastDate = reportDates[reportDates.length - 1] || '';
  const lastReport = reports[lastDate] || [];
  const data = lastReport.length > 0 ? lastReport.find((item) => item.n.toLowerCase() === id.toLowerCase()) : {};

  const allData: any[] = [];
  reportDates.forEach((date: string) => {
    const spesificDateReport = reports[date];
    const onlyNeededReport = spesificDateReport.find((item) => item.n.toLowerCase() === id.toLowerCase());
    if (onlyNeededReport) {
      allData.push({
        ...onlyNeededReport,
        date,
      });
    }
  });

  return { props: { data, logo: ecommerce?.logo || '', lastUpdate: lastDate, id, allData: allData } };
};

export default DetailPage;
