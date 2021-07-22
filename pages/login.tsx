import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/client'

import { Button, Layout, Loader } from '../components'

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
               <Loader color="#2563eb" />
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
                        {providers?.google?.id && <WithGoogle />}
                     </>
                  )}
               </div>
            )}
         </main>
      </Layout>
   )
}

export default Login

const WithGoogle = () => {
   const [is_loading, set_is_loading] = useState(false)
   return (
      <Button.Text
         variant="solid"
         color="primary"
         is_loading={is_loading}
         on_click={() => {
            set_is_loading(true)
            signIn('google')
         }}
      >
         Sign In with Google
      </Button.Text>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {
   const providers = await getProviders()
   return {
      props: { providers },
   }
}
