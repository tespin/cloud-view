import React, { useState } from 'react';
import Image from 'next/image';
import Container from './UI/Container';
import cloudImg from '@/public/cloud_3542.png';

interface PlaceholderProps {
  className: string;
}

const Placeholder = ({ className }: PlaceholderProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [cloudImage, setCloudImage] = useState<string | null>(null);

  const imageHandler = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {imageLoaded ? (
        <div className={`${className}`}>
          <Image src={cloudImg} alt='cloud photo' />
          <button
            className=' xs:w-full xs:mt-4 xs:bg-base xs:hover:bg-base-darkMd xs:focus:outline-none xs:focus:ring xs:text-white xs:py-3 xs:px-6 xs:rounded-md'
            onClick={imageHandler}
          >
            Request a new cloud
          </button>
        </div>
      ) : (
        <Container
          className={`xs:justify-center xs:items-center xs:w-96 xs:h-96 xs:rounded-md xs:border-dashed xs:border-black xs:border-[1px] ${className}`}
        >
          <button
            className='xs:bg-base xs:hover:bg-base-darkMd xs:focus:outline-none xs:focus:ring xs:text-white xs:py-3 xs:px-6 xs:rounded-md'
            onClick={imageHandler}
          >
            Request a cloud
          </button>
        </Container>
      )}
    </>
  );
};

export default Placeholder;
