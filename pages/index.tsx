import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import HomeHead from '@/p_home/HomeHead'
import Talk from '@/p_home/Talk'
import Recommend from '@/p_home/Recommend'
import { getHome } from 'core/api'
import { Nullable } from 'types'
import { IHomeResponse } from './api/home'

const Home: NextPage<{ home: Nullable<IHomeResponse> }> = ({ home }) => {
  const banner = home?.data.banner || []

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
        <HomeHead banner={banner} />
        <Talk />
        <Recommend />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getHome()
    return { props: { home: data } }
  } catch (error) {
    return { props: { home: null } }
  }
}
