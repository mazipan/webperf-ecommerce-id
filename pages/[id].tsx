import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import Layout from '../components/Layout';
import CardDetail from '../components/CardDetail';

import reports from '../reports/output';
import dataEcommerce from '../constants/ecommerce';
import { EcommerceItem } from '../types';

const DetailPage = ({ data, ecommerce, lastUpdate }): React.ReactElement => {
  return (
    <Layout>
      <img className="h-10 w-auto rounded" src={ecommerce.logo} alt={data.n} />
      <h1 className="text-3xl font-bold capitalize">Web Performance: {data.n}</h1>
      <small className="text-gray-600 text-lg font-bold">Last update {lastUpdate}</small>

      <CardDetail data={data.d} title="Desktop" />
      <CardDetail data={data.m} title="Mobile" />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = dataEcommerce.map((i: EcommerceItem) => `/${i.name.toLowerCase()}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id: string = params ? `${params.id}` : '';
  const ecommerce = dataEcommerce.find((i: EcommerceItem) => i.name.toLowerCase() === id.toLowerCase());

  const reportDates = Object.keys(reports) || [];
  const lastDate = reportDates[reportDates.length - 1] || '';
  const lastReport = reports[lastDate] || [];
  const data = lastReport.length > 0 ? lastReport.find((item) => item.n.toLowerCase() === id.toLowerCase()) : {};

  return { props: { data, ecommerce, lastUpdate: lastDate } };
};

export default DetailPage;
