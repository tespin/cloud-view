import React, { useState } from 'react';
import Image from 'next/image';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Container from '@/components/UI/Container';
// import { DownloadIcon } from '@radix-ui/react-icons';
// import { TrashIcon } from '@radix-ui/react-icons';
import DownloadIcon from '@/components/UI/DownloadIcon';
import TrashIcon from '@/components/UI/TrashIcon';

interface ImageModalProps {
  link: { src: string; id: string; date: string };
  onDelete: (id: string) => void;
}

const ImageModal = ({ link, onDelete }: ImageModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [linkArr, setLinkArr] =
    useState<{ src: string; id: string; date: string }[]>();

  const downloadHandler = async (src: string, id: string) => {
    const base64 = await fetch(src);
    const blob = await base64.blob();

    const url = URL.createObjectURL(blob);
    const fn = id.slice(-4);

    let a = document.createElement('a');
    a.href = url;
    a.download = `cloud_${fn}`;
    a.click();
  };

  return (
    <>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <button className='xs:focus:outline-none xs:focus:ring xs:rounded-lg xs:hover:bg-black/80'>
            <Image
              src={link.src}
              alt='View image'
              width={0}
              height={0}
              className='xs:rounded-lg xs:w-full xs:h-auto xs:hover:opacity-50'
            />
          </button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={`xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-base/60 ${
              open ? 'animate-overlayShow' : 'animate-overlayHide'
            }`}
          />
          <DialogPrimitive.Content
            className={`xs:fixed xs:inset-0 xs:mx-auto xs:flex xs:flex-col xs:justify-center xs:items-center xs:w-full xs:h-auto xs:max-w-xs ${
              open ? 'animate-lightBoxShow' : 'animate-lightBoxHide'
            }`}
          >
            <Container className='xs:flex xs:flex-row xs:w-full xs:justify-between'>
              <DialogPrimitive.Close aria-label='Close' asChild>
                <button className='xs:focus:outline-none xs:focus:ring xs:hover:text-base-semiMd xs:text-white'>
                  <ArrowLeftIcon className='xs:w-6 xs:h-6' />
                </button>
              </DialogPrimitive.Close>
              <p className='xs:text-white'>{link.date}</p>
            </Container>
            <Image
              src={link.src}
              alt='cloud photo'
              width={0}
              height={0}
              className='xs:mt-2 xs:rounded-lg xs:w-full xs:h-auto'
            />
            <Container className='xs:flex-row xs:w-full xs:justify-evenly xs:mt-4'>
              <button onClick={() => downloadHandler(link.src, link.id)}>
                <DownloadIcon className='xs:w-10 xs:h-10' />
              </button>
              <button onClick={() => onDelete(link.id)}>
                <TrashIcon className='xs:w-10 xs:h-10' />
              </button>
            </Container>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

export default ImageModal;
