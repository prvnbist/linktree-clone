import tw from 'twin.macro'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { getProviders, signIn, useSession } from 'next-auth/client'

import { Layout, Loader } from '../components'

interface ILogin {
   providers: {
      google: {
         id: string
         name: string
         type: string
         signinUrl: string
         callbackUrl: string
      }
   }
}

const Login = ({ providers }: ILogin) => {
   const router = useRouter()
   const [session, loading] = useSession()

   useEffect(() => {
      if (!loading && session?.user?.email) {
         router.push('/admin')
      }
   }, [router, loading, session])

   return (
      <Layout>
         <main tw="pt-12 flex justify-center">
            {loading ? (
               <Loader />
            ) : (
               <div tw="bg-white rounded shadow-lg p-12">
                  <h2 tw="text-xl">
                     {session
                        ? 'You are already logged in!'
                        : 'Login to your account'}
                  </h2>
                  {!session && (
                     <>
                        <p tw="text-gray-400 mt-2 mb-6">
                           *This is a link tree clone.
                        </p>
                        {providers?.google?.id && (
                           <button
                              tw="w-full bg-blue-600 text-white rounded p-3"
                              onClick={() => signIn(providers.google.id)}
                           >
                              Sign In with Google
                           </button>
                        )}
                     </>
                  )}
               </div>
            )}
         </main>
      </Layout>
   )
}

export default Login

export const getServerSideProps: GetServerSideProps = async () => {
   const providers = await getProviders()
   return {
      props: { providers },
   }
}
