import React from 'react';
import Image from 'next/image';
import trashIcon from '@/public/trash-icon.svg';

interface TrashIconProps {
  className?: string;
}

const TrashIcon = ({ className }: TrashIconProps) => {
  return (
    <>
      <Image src={trashIcon} className={className} alt='Download image' />
    </>
  );
};

export default TrashIcon;
