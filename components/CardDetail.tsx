import React from 'react';
import dynamic from 'next/dynamic';

import Gauge from './Gauge';
import { getLCPColorClass, getFIDColorClass, getCLSColorClass } from '../utils/getColorClass';

const ChartTimeline = dynamic(() => import('./ChartTimeline'), { ssr: false });

const CardDetail = ({ data, allData }): React.ReactElement => {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2 bg-white shadow overflow-hidden rounded-lg">
          <div className="flex justify-center items-center">
            <Gauge score={data.perf} variant="large" />
          </div>
        </div>

        <div className="p-2 bg-white shadow overflow-hidden rounded-lg">
          <ChartTimeline data={allData} title="Performance Score" dataKey="perf" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-2 bg-white shadow overflow-hidden rounded-lg text-center">
          <small className="text-xs text-gray-600 italic">(Loading)</small>
          <h3 className="text-3xl text-blue-500 font-bold">LCP</h3>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize ${getLCPColorClass(data.lcp)}`}>
              {(data.lcp / 1000).toFixed(2)}
            </span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
        <div className="p-2 bg-white shadow overflow-hidden rounded-lg text-center">
          <small className="text-xs text-gray-600 italic">(Interactivity)</small>
          <h3 className="text-3xl text-blue-500 font-bold">FID</h3>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize ${getFIDColorClass(data.fid)}`}>
              {data.fid.toFixed(0)}
            </span>
            <small className="text-lg font-bold text-gray-600 ml-1">ms</small>
          </div>
        </div>
        <div className="p-2 bg-white shadow overflow-hidden rounded-lg text-center">
          <small className="text-xs text-gray-600 italic">(Stability)</small>
          <h3 className="text-3xl text-blue-500 font-bold">CLS</h3>
          <div className={`text-3xl text-gray-600 font-bold capitalize ${getCLSColorClass(data.cls)}`}>
            {data.cls.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-2 bg-white shadow overflow-hidden rounded-lg text-center">
          <small className="text-sm text-blue-500 font-bold">TBT</small>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize`}>{(data.tbt / 1000).toFixed(2)}</span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
        <div className="p-2 bg-white shadow overflow-hidden rounded-lg text-center">
          <small className="text-sm text-blue-500 font-bold">FCP</small>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize`}>{(data.fcp / 1000).toFixed(2)}</span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
        <div className="p-2 bg-white shadow overflow-hidden rounded-lg text-center">
          <small className="text-sm text-blue-500 font-bold">TTI</small>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize`}>{(data.tti / 1000).toFixed(2)}</span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
