import React from 'react';

import DesktopIcon from '../components/Icons/Desktop';
import PhoneIcon from '../components/Icons/Phone';

interface DeviceChooserProps {
  activeDevice: string;
  onChangeDevice: (newDevice: string) => void;
}

const DeviceChooser = ({ activeDevice, onChangeDevice }: DeviceChooserProps): React.ReactElement => {
  const handleChangeDevice = (newDevice) => {
    onChangeDevice(newDevice);
  };

  return (
    <div className="mt-4 flex">
      <div
        className={`mr-2 p-2 flex bg-white overflow-hidden rounded-lg ${
          activeDevice === 'desktop' ? 'text-green-400 border-green-400 border-2' : 'text-gray-600 border-2'
        }`}
        onClick={() => {
          handleChangeDevice('desktop');
        }}
      >
        <DesktopIcon />
        <span className="ml-2">Desktop</span>
      </div>

      <div
        className={`p-2 flex bg-white overflow-hidden rounded-lg ${
          activeDevice === 'mobile' ? 'text-green-400 border-green-400 border-2' : 'text-gray-600 border-2'
        }`}
        onClick={() => {
          handleChangeDevice('mobile');
        }}
      >
        <PhoneIcon />
        <span className="ml-2">Mobile</span>
      </div>
    </div>
  );
};

export default DeviceChooser;
