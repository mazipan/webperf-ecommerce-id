import React from 'react';
import { getPerfColorClass } from '../utils/getColorClass';

const HomeData = ({ data, title, keyNow, keyPrev }): React.ReactElement => {
  return (
    <div className="text-gray-600 my-2 mr-2">
      <small className="text-sm font-bold">{title}</small>
      <div className="flex justify-start items-center">
        <span className={`text-5xl font-bold capitalize ${getPerfColorClass(data[keyNow].perf)}`}>
          {(data[keyNow].perf * 100).toFixed(0)}
        </span>

        {data[keyNow].perf < data[keyPrev].perf ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-600"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        )}

        <span className={`text-xl font-bold capitalize text-gray-600`}>{(data[keyPrev].perf * 100).toFixed(0)}</span>
      </div>
    </div>
  );
};

export default HomeData;
