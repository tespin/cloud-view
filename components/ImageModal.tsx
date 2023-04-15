import React, { useState } from 'react';
import Image from 'next/image';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

interface ImageModalProps {
  link: { src: string; id: string; date: string };
}

const ImageModal = ({ link }: ImageModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <button className='xs:focus:outline-none xs:focus:ring xs:rounded-lg'>
            <Image
              src={link.src}
              alt='View image'
              width={0}
              height={0}
              className='xs:rounded-lg xs:w-full xs:h-auto'
            />
          </button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={`xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-base/60 ${
              open ? 'animate-overlayShow' : 'animate-overlayHide'
            }`}
          />
          <DialogPrimitive.Content className='xs:fixed xs:inset-0 xs:mx-auto xs:flex xs:flex-col xs:justify-center xs:items-center xs:w-full xs:h-auto xs:max-w-xs'>
            <div className='xs:flex xs:flex-row xs:w-full xs:justify-between'>
              <DialogPrimitive.Close asChild>
                <button className='xs:focus:outline-none xs:focus:ring xs:hover:text-base-semiMd xs:text-white'>
                  <ArrowLeftIcon className='xs:w-6 xs:h-6' />
                </button>
              </DialogPrimitive.Close>
              <p className='xs:text-white'>February 20, 2023</p>
            </div>
            <Image
              src={link.src}
              alt='cloud photo'
              width={0}
              height={0}
              className={`xs:mt-1 xs:rounded-lg xs:w-full xs:h-auto ${
                open ? 'animate-lightBoxShow' : 'animate-lightBoxHide'
              }
            `}
            />
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

export default ImageModal;
