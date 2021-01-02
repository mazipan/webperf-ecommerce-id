import React from 'react';

const Footer = (): React.ReactElement => {
  return (
    <footer className="bg-gray-900">
      <ul className="flex items-center justify-between max-w-4xl p-4 mx-auto text-sm text-white md:p-8">
        <li>
          Code by{' '}
          <a href="https://mazipan.space/" target="_blank" rel="noopenner noreferrer" className="font-bold">
            Irfan Maulana
          </a>
        </li>

        <li>
          <a
            href="https://github.com/mazipan/webperf-ecommerce-id"
            target="_blank"
            rel="noopenner noreferrer"
            className="font-bold"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
