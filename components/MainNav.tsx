import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import nodeCrypto from 'crypto';
import Container from './UI/Container';
import Dialog from './UI/Dialog';
import Navigation from './UI/Navigation';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

interface MainNavProps {}

const MainNav = ({}: MainNavProps) => {
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);

  const generateItems = () => {
    const labels = ['About', 'Privacy', 'Storage'];

    const generated = labels.map((item) => ({
      id:
        typeof window !== 'undefined'
          ? window.crypto.randomUUID()
          : nodeCrypto.randomUUID(),
      label: item,
    }));

    setItems(generated);
  };

  useEffect(() => {
    generateItems();
  }, []);

  return (
    <>
      <Container className='xs:flex-row xs:justify-between xs:w-full'>
        <Link href='/' className='xs:text-xl'>
          Cloud View
        </Link>
        <Dialog>
          <Navigation items={items}></Navigation>
        </Dialog>
        {/* <Dialog
          renderNav={(ref: React.Ref<HTMLAnchorElement>) => (
            <Navigation items={items} ref={ref} />
          )}
        ></Dialog> */}
      </Container>
      <SeparatorPrimitive.Root className='xs:w-full xs:h-[1px] xs:bg-base-light mt-4' />
    </>
  );
};

export default MainNav;
