import React from 'react';

interface GalleryProps {
  links: { url: string; id: string }[];
}

const ImageGallery = ({ links }: GalleryProps) => {
  return (
    <>
      {links.map((link) => {
        return <p key={link.id}>{link.url}</p>;
      })}
    </>
  );
};

export default ImageGallery;
