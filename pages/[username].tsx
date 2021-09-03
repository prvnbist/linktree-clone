import React from 'react'
import Image from 'next/image'
import tw, { styled } from 'twin.macro'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { QUERIES } from '../graphql'
import { Loader } from '../components'
import * as Illo from '../assets/illustrations'

const UserLinks = () => {
   const router = useRouter()
   const { username = '' } = router.query
   const [user, setUser] = React.useState({})
   const [status, setStatus] = React.useState('LOADING')

   useQuery(QUERIES.USER_BY_USERNAME, {
      variables: { username },
      onCompleted: result => {
         const { users = [] } = result
         if (users.length === 0) {
            setStatus('NOT_FOUND')
            return
         }
         const [user] = users
         setUser(user)
         setStatus('SUCCESS')
      },
      onError: error => {
         console.error(error)
         setStatus('ERROR')
      },
   })

   if (status === 'LOADING')
      return (
         <div tw="pt-16 h-screen w-full flex justify-center">
            <Loader />
         </div>
      )
   if (status === 'ERROR') return <p>Error loading user</p>
   if (status === 'NOT_FOUND')
      return (
         <div tw="pt-16 h-screen w-full flex flex-col items-center">
            <Illo.Empty />
            <p tw="mt-3 text-lg text-gray-600">User not found!</p>
         </div>
      )
   return (
      <div
         tw="bg-gray-50 h-screen p-16 flex flex-col items-center"
         style={{ backgroundImage: "url('/pattern.svg')" }}
      >
         {user?.image && (
            <section tw="relative flex-shrink-0 w-[100px] h-[100px] rounded-full overflow-hidden shadow-md">
               <Image layout="fill" src={user?.image} alt={user?.name || ''} />
            </section>
         )}
         <h1 tw="mt-3 mb-6 text-white text-lg">{user?.name}</h1>
         {user?.links?.length > 0 && (
            <ul tw="space-y-3 w-full flex flex-col items-center">
               {user?.links?.map(link => (
                  <LinkButton key={link.id} link={link} />
               ))}
            </ul>
         )}
      </div>
   )
}

export default UserLinks

interface ILinkButton {
   link: { url?: string; title?: string }
}

const LinkButton = ({ link = {} }: ILinkButton) => {
   return (
      <li tw="list-none h-10 w-full md:w-[380px]">
         <Button
            href={link.url}
            target="_blank"
            title={link.title}
            rel="noopener noreferrer"
         >
            {link.title}
         </Button>
      </li>
   )
}

const Button = styled.a`
   ${tw`overflow-hidden relative h-full w-full border border-white text-white flex items-center justify-center`}
   &::after {
      background: #fff;
      content: '';
      height: 155px;
      left: -125px;
      position: absolute;
      top: -50px;
      transform: rotate(45deg);
      transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
      width: 80px;
   }
   &:hover::after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
   }
`
