import React from 'react';
import Image from 'next/image';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface ImageModalProps {
  link: { src: string; id: string };
}

const ImageModal = ({ link }: ImageModalProps) => {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <div className='xs:relative xs:w-full xs:h-48'>
          <Image
            src={link.src}
            alt='cloud photo'
            fill
            className='xs:rounded-lg'
          />
        </div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={`xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-base/20`}
        />
        <DialogPrimitive.Content className='xs:fixed xs:inset-0 xs:mx-auto xs:flex xs:justify-center xs:items-center xs:max-w-xs'>
          <Image
            src={link.src}
            alt='cloud photo'
            width={300}
            height={300}
            className='xs:rounded-lg'
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ImageModal;
