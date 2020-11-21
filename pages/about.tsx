import React from 'react';

import dataEcommerce from '../constants/ecommerce';
import Layout from '../components/Layout';

const About = (): React.ReactElement => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold capitalize">About</h1>
      <div className="py-2">Web Perf Comparison for E-Commerce in Indonesia</div>

      <h3 className="text-xl font-bold capitalize">Scheduler</h3>
      <div className="py-2">Once a week</div>

      <h3 className="text-xl font-bold capitalize">Quantile</h3>
      <div className="py-2">Running Lighthouse 5 times then get quantile 75th</div>

      <h3 className="text-xl font-bold capitalize">Data Source</h3>
      <div className="py-2">PageSpeed Insight</div>

      <h3 className="text-xl font-bold capitalize">List of E-Commerce</h3>

      {dataEcommerce.map((item) => (
        <div className="my-2 p-4 bg-white shadow overflow-hidden rounded-lg" key={item.name}>
          <img className="h-10 w-auto rounded" src={item.logo} alt={item.name} />
        </div>
      ))}
    </Layout>
  );
};

export default About;
