import type { NextPage } from 'next'
import Head from 'next/head'
import HomeHead from '@/p_home/HomeHead'
import Talk from '@/p_home/Talk'
import Recommend from '@/p_home/Recommend'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>精品课</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
        />
      </Head>
      <main>
        <HomeHead />
        <Talk />
        <Recommend />
      </main>
    </div>
  )
}

export default Home
