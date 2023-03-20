import Head from 'next/head'
import Image from 'next/image'
import { Inter } from "next/font/google"

import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';
import Placeholder from '@/components/UI/Placeholder';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Cloud View</title>
        <meta name="description" content="Cloud View app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:max-w-md xs:my-4 xs:mx-8'>
          <MainNav/>
          <main>
              <h1 className='xs:mt-12 xs:text-center xs:text-4xl'>Your personal cloud storage solution.</h1>
          </main>
          <Placeholder className='xs:mt-8' />
        </Container>
      </Container>
    </>
  )
}
