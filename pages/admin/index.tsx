import tw from 'twin.macro'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useSubscription } from '@apollo/client'

import { ILink } from '../../interfaces'
import { SUBSCRIPTIONS } from '../../graphql'
import { Links } from '../../components/links'
import * as Illo from '../../assets/illustrations'
import { Layout, Loader, Link } from '../../components'

const Admin = () => {
   const router = useRouter()
   const [session, loading] = useSession()
   const { loading: loading_links, data: { links = [] } = {} } =
      useSubscription(SUBSCRIPTIONS.LINKS, {
         skip: !session?.user?.id,
         variables: {
            where: { user_id: { _eq: session?.user?.id } },
         },
      })

   useEffect(() => {
      if (!loading && !session) {
         router.push('/login')
      }
   }, [router, session, loading])

   return (
      <Layout>
         <main tw="p-3">
            {loading || loading_links ? (
               <div tw="w-full flex justify-center">
                  <Loader color="#2563eb" />
               </div>
            ) : (
               <>
                  {links.length === 0 ? (
                     <div tw="w-full h-full flex justify-center pt-12">
                        <Illo.Empty />
                     </div>
                  ) : (
                     <Links>
                        {links.map((link: ILink) => (
                           <Link key={link.id} link={link} />
                        ))}
                     </Links>
                  )}
               </>
            )}
         </main>
      </Layout>
   )
}

export default Admin
