import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import Layout from '../components/Layout';
import CardDetail from '../components/CardDetail';
import DeviceChooser from '../components/DeviceChooser';

import reports from '../reports/output';
import dataEcommerce from '../constants/ecommerce';
import { EcommerceItem } from '../types';

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

      <DeviceChooser activeDevice={showDevice} onChangeDevice={handleChangeDevice} />

      <CardDetail data={showDevice === 'desktop' ? data.d : data.m} allData={allData} />
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
