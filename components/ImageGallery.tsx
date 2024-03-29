import React from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

interface GalleryProps {
  links: { src: string; id: string; date: string }[];
  onDelete: (id: string) => void;
}

const ImageGallery = ({ links, onDelete }: GalleryProps) => {
  return (
    <>
      <div className='xs:grid xs:grid-cols-2 xs:gap-8 xs:mt-8'>
        {links.length > 0 &&
          links.map((link) => {
            // return <p key={link.id}>{link.url}</p>;
            return <ImageModal link={link} key={link.id} onDelete={onDelete} />;
          })}
      </div>
    </>
  );
};

export default ImageGallery;
