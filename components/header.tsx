import tw from 'twin.macro'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'

const get_initials = name =>
   name
      .replace(/[^a-zA-Z- ]/g, '')
      .match(/\b\w/g)
      .join('') || ''

export const Header = () => {
   const [session, loading] = useSession()

   return (
      <header tw="bg-white w-full h-16 flex justify-between items-center px-3">
         <Link href="/">
            <a tw="cursor-pointer text-lg font-medium text-gray-700">
               Link Tree Clone
            </a>
         </Link>
         <nav tw="flex gap-3">
            {!loading && session?.user?.email && (
               <>
                  <span
                     title={session.user?.name}
                     tw="flex items-center justify-center h-10 w-10 bg-green-300 text-black rounded-full"
                  >
                     {get_initials(session.user?.name)}
                  </span>
                  <button
                     onClick={() => signOut({ redirect: false })}
                     tw="text-sm font-medium uppercase tracking-wider border border-red-300 rounded px-4 py-2 text-red-700 hover:(bg-red-200 text-red-900)"
                  >
                     Log Out
                  </button>
               </>
            )}
         </nav>
      </header>
   )
}
