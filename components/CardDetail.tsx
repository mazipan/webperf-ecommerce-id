import React from 'react';
import { getPerfColorClass, getLCPColorClass, getFIDColorClass, getCLSColorClass } from '../utils/getColorClass';

const CardDetail = ({ data, title }): React.ReactElement => {
  return (
    <div className="mt-4 p-4 bg-white shadow overflow-hidden rounded-lg">
      <div className="flex justify-center space-between">
        <div className="text-gray-600 my-2 mr-2 text-center">
          <small className="text-sm font-bold">{title}</small>
          <div className={`text-6xl font-bold capitalize ${getPerfColorClass(data.perf)}`}>
            {(data.perf * 100).toFixed(0)}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-between my-2">
        <div className="w-20 my-2 mr-4 text-center">
          <small className="text-xs text-gray-600 italic">(Loading)</small>
          <h3 className="text-3xl text-blue-500 font-bold">LCP</h3>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize ${getLCPColorClass(data.lcp)}`}>
              {(data.lcp / 1000).toFixed(2)}
            </span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
        <div className="w-20 my-2 mr-4 text-center">
          <small className="text-xs text-gray-600 italic">(Interactivity)</small>
          <h3 className="text-3xl text-blue-500 font-bold">FID</h3>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize ${getFIDColorClass(data.fid)}`}>
              {data.fid.toFixed(0)}
            </span>
            <small className="text-lg font-bold text-gray-600 ml-1">ms</small>
          </div>
        </div>
        <div className="w-20 my-2 mr-4 text-center">
          <small className="text-xs text-gray-600 italic">(Stability)</small>
          <h3 className="text-3xl text-blue-500 font-bold">CLS</h3>
          <div className={`text-3xl text-gray-600 font-bold capitalize ${getCLSColorClass(data.cls)}`}>
            {data.cls.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-between my-2">
        <div className="w-20 my-2 mr-4 text-center">
          <small className="text-sm text-blue-500 font-bold">TBT</small>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize`}>{(data.tbt / 1000).toFixed(2)}</span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
        <div className="w-20 my-2 mr-4 text-center">
          <small className="text-sm text-blue-500 font-bold">FCP</small>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize`}>{(data.fcp / 1000).toFixed(2)}</span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
        <div className="w-20 my-2 mr-4 text-center">
          <small className="text-sm text-blue-500 font-bold">TTI</small>
          <div className="text-center">
            <span className={`text-3xl text-gray-600 font-bold capitalize`}>{(data.tti / 1000).toFixed(2)}</span>
            <small className="text-lg font-bold text-gray-600 ml-1">s</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
