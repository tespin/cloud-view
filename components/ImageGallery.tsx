import React from 'react';
import Image from 'next/image';
import Container from '@/components/UI/Container';

interface GalleryProps {
  links: { url: string; id: string }[];
}

const ImageGallery = ({ links }: GalleryProps) => {
  return (
    <>
      <div className='xs:grid xs:grid-cols-2 xs:gap-8 xs:mt-4'>
        {links.map((link) => {
          // return <p key={link.id}>{link.url}</p>;
          return (
            <div className='xs:relative xs:w-full xs:h-48' key={link.id}>
              <Image
                src={link.url}
                alt='cloud photo'
                fill
                className='xs:rounded-lg'
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageGallery;
