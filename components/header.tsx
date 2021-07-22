import tw from 'twin.macro'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/client'

import { Button } from './button'

const get_initials = (name: string): string =>
   name
      .replace(/[^a-zA-Z- ]/g, '')
      .match(/\b\w/g)
      .join('') || ''

export const Header = () => {
   const [session, loading] = useSession()

   return (
      <header tw="bg-white w-full h-16 flex justify-between items-center px-3 border-b border-gray-300">
         <Link href="/">
            <a tw="cursor-pointer text-lg font-medium text-gray-700">
               Link Tree Clone
            </a>
         </Link>
         <nav tw="flex gap-3">
            {!loading && session?.user?.email && (
               <>
                  <span
                     title={session.user?.name || ''}
                     tw="overflow-hidden flex items-center justify-center h-10 w-10 bg-green-300 text-black rounded-full"
                  >
                     {session.user?.image ? (
                        <Image
                           width="100%"
                           height="100%"
                           src={session.user?.image}
                           alt={session.user?.name || ''}
                        />
                     ) : (
                        get_initials(session.user?.name || '')
                     )}
                  </span>
                  <Logout />
               </>
            )}
         </nav>
      </header>
   )
}

const Logout = () => {
   const [is_loading, set_is_loading] = useState(false)
   return (
      <Button.Text
         variant="outline"
         color="danger"
         is_loading={is_loading}
         on_click={() => {
            set_is_loading(true)
            signOut({ redirect: false })
         }}
      >
         Log Out
      </Button.Text>
   )
}
