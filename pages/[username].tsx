import Image from 'next/image'
import { useState } from 'react'
import tw, { styled } from 'twin.macro'
import { GraphQLClient } from 'graphql-request'

import { Loader } from '../components'
import * as Illo from '../assets/illustrations'

const client = new GraphQLClient(
   process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '',
   {
      headers: {
         'x-hasura-admin-secret': process.env.NEXT_PUBLIC_GRAPHQL_SECRET || '',
      },
   }
)

interface IUserLinks {
   status: 'LOADING' | 'NOT_FOUND' | 'ERROR'
   user: string
}

const UserLinks = ({ status = 'LOADING', user }: IUserLinks) => {
   const parsed = user && JSON.parse(user)

   if (status === 'LOADING')
      return (
         <div
            tw="pt-16 h-screen w-full flex justify-center"
            style={{ backgroundImage: "url('/pattern.svg')" }}
         >
            <Loader color="white" />
         </div>
      )
   if (status === 'ERROR') return <p>Error loading user</p>
   if (status === 'NOT_FOUND')
      return (
         <div
            tw="pt-16 h-screen w-full flex flex-col items-center"
            style={{ backgroundImage: "url('/pattern.svg')" }}
         >
            <Illo.Empty />
            <p tw="mt-3 text-lg text-gray-600">User not found!</p>
         </div>
      )
   return (
      <div
         tw="bg-gray-50 h-screen overflow-y-auto p-6 md:p-16 flex flex-col items-center"
         style={{ backgroundImage: "url('/pattern.svg')" }}
      >
         {parsed?.image && (
            <section tw="relative flex-shrink-0 w-[100px] h-[100px] rounded-full overflow-hidden shadow-md">
               <Image
                  layout="fill"
                  src={parsed?.image}
                  alt={parsed?.name || ''}
               />
            </section>
         )}
         <h1 tw="mt-3 text-white text-2xl">{parsed?.name}</h1>
         <p tw="text-center w-full md:w-6/12 xl:w-4/12 mt-2 mb-6 text-white font-thin opacity-80">
            {parsed?.bio}
         </p>
         {parsed?.links?.length > 0 && (
            <ul tw="space-y-3 w-full flex flex-col items-center">
               {parsed?.links?.map(
                  (link: {
                     id: string
                     url: string
                     title: string
                     is_nsfw: boolean
                     is_header: boolean
                  }) =>
                     link.is_header ? (
                        <li tw="mx-auto w-full md:w-[380px] pt-4" key={link.id}>
                           <SectionHeader>{link.title}</SectionHeader>
                        </li>
                     ) : (
                        <LinkButton key={link.id} link={link} />
                     )
               )}
            </ul>
         )}
      </div>
   )
}

export default UserLinks

export const getStaticPaths = () => {
   return { paths: [], fallback: true }
}

export const getStaticProps = async ({ params }: any) => {
   const { username = '' } = params
   if (!username) {
      return {
         props: {
            status: 'ERROR',
            user: null,
         },
      }
   }

   const { users } = await client.request(USER, { username })

   if (users.length === 0) {
      return {
         props: {
            status: 'NOT_FOUND',
            user: null,
         },
      }
   }

   const [user] = users

   return {
      props: {
         status: 'SUCCESS',
         user: JSON.stringify(user),
      },
   }
}

interface ILinkButton {
   link: { is_nsfw?: boolean; url?: string; title?: string }
}

const LinkButton = ({ link = {} }: ILinkButton) => {
   const [isOpen, setIsOpen] = useState(false)

   return (
      <li css={[tw`list-none w-full md:w-[380px]`, !link.is_nsfw && tw`h-10`]}>
         {link.is_nsfw ? (
            <>
               <StyledButton onClick={() => setIsOpen(!isOpen)}>
                  {link.title}
               </StyledButton>
               {isOpen && (
                  <section tw="text-center mt-2 border border-gray-800 text-white p-2 pb-4">
                     <p tw="mb-2 text-gray-400">
                        You're about to visit a page with sensitive content.
                        Please confirm before visting.
                     </p>
                     <a
                        href={link.url}
                        target="_blank"
                        title={link.title}
                        rel="noopener noreferrer"
                        tw="uppercase tracking-wider font-medium text-sm pb-1 text-yellow-300 border-b border-yellow-300"
                     >
                        Visit Page
                     </a>
                  </section>
               )}
            </>
         ) : (
            <StyledLink
               href={link.url}
               target="_blank"
               title={link.title}
               rel="noopener noreferrer"
            >
               {link.title}
            </StyledLink>
         )}
      </li>
   )
}

const StyledLink = styled.a`
   ${tw`overflow-hidden relative h-10 w-full border border-white text-white flex items-center justify-center`}
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

const StyledButton = styled(StyledLink)`
   cursor: pointer;
`

const SectionHeader = styled.h3`
   ${tw`text-yellow-200 text-center text-sm uppercase tracking-wider font-medium relative`}
   &::before, &::after {
      content: '';
      top: calc(50% - 1px);
      ${tw`absolute w-[48px] h-[1px] bg-gray-600`}
   }
   &::before {
      ${tw`left-0`}
   }
   &::after {
      ${tw`right-0`}
   }
`

const USER = `
   query users($username: String!) {
      users(where: { username: { _eq: $username } }) {
         id
         bio
         name
         image
         links(
            order_by: { priority: asc }
            where: { is_active: { _eq: true } }
         ) {
            id
            url
            title
            is_nsfw
            is_header
         }
      }
   }
`
