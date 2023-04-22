import React from 'react';
import Image from 'next/image';
import downloadIcon from '@/public/download-icon.svg';

interface DownloadIconProps {
  className?: string;
}

const DownloadIcon = ({ className }: DownloadIconProps) => {
  return (
    <>
      <Image src={downloadIcon} className={className} alt='Download image' />
    </>
  );
};

export default DownloadIcon;
