import { useSession, signIn, signOut } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'

import Modal from '../components/Modal'
import Table from '../components/Table'
import { GET_ORGANIZATIONS } from '../graphql/queries'

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_ORGANIZATIONS)
  const { data: session } = useSession()

  const handleSignout = () => {
    window.location.href =
      'http://localhost:8881/auth/realms/onearth/protocol/openid-connect/logout?redirect_uri=http://localhost:3000/api/auth/callback/keycloak'
    signOut({ callbackUrl: window.location.origin })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const orgs = data.organization

  if (session) {
    console.log(session)

    return (
      <>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Acesso permitido</h1>
              <p className="py-6">Usuario: {session.user.email}</p>

              <button
                className="btn btn-primary"
                onClick={() => handleSignout()}
              >
                Sair
              </button>

              <div className="flex min-h-screen flex-col items-center justify-center py-2">
                {session?.roles.includes('creator') && <Modal />}
                <Table data={orgs} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Acesso restrito</h1>
            <p className="py-6">Faca login para continuar</p>
            <button className="btn btn-primary" onClick={() => signIn()}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
