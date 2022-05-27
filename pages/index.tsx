import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'

import Modal from '../components/Modal'
import Table from '../components/Table'
import { GET_ORGANIZATIONS } from '../graphql/queries'

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_ORGANIZATIONS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const orgs = data.organization

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal />
      <Table data={orgs} />
    </div>
  )
}

export default Home
