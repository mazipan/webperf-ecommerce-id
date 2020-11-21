import React from 'react';
import Link from 'next/link';

const Header = (): React.ReactElement => {
  return (
    <header className="bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-4xl p-4 mx-auto md:flex-no-wrap">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-xl font-bold text-white">⚡ E-Commerce Web Perf</a>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/about">
            <a className="text-white">About</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
