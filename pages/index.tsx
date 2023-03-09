import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import Container from '@/components/UI/Container';
import TopNavigation from '@/components/TopNavigation';

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
      <Container>
        <TopNavigation/>
          <main>
              <h1>Your personal cloud storage solution.</h1>
          </main>
      </Container>
    </>
  )
}
