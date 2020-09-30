import React from 'react';
import Head from 'next/head';

import Header from './HeaderSection';
import Footer from './FooterSection';
import { BASE_PATH } from '../constants';

const title = 'E-Commerce Web Perf';
const titleWithIcon = `⚡️ ${title}`;
const desc = 'Web Perf Comparison for E-Commerce in Indonesia';
const url = BASE_PATH;

const Layout = ({ children }): React.ReactElement => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#7B341E" />
        <title key="title">{title}</title>
        <meta key="description" name="description" content={desc} />

        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:image" content={metaImg} /> */}
        <meta name="twitter:site" content="@Maz_Ipan" />
        <meta key="twitter:title" name="twitter:title" content={titleWithIcon} />
        <meta key="twitter:description" name="twitter:description" content={desc} />

        <meta key="og:title" property="og:title" content={titleWithIcon} />
        <meta key="og:description" property="og:description" content={desc} />
        <meta key="og:url" property="og:url" content={url} />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content={metaImg} /> */}

        <link rel="apple-touch-icon" sizes="180x180" href={`${url}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${url}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${url}/favicon-16x16.png`} />
        <link rel="manifest" href={`${url}/site.webmanifest`} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full max-w-4xl p-4 mx-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
