import Image from 'next/image'
import tw, { styled } from 'twin.macro'
import { GraphQLClient } from 'graphql-request'

import { ILink } from '../interfaces'
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
   console.log(status)
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
         tw="bg-gray-50 h-screen p-16 flex flex-col items-center"
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
         <h1 tw="mt-3 mb-6 text-white text-lg">{parsed?.name}</h1>
         {parsed?.links?.length > 0 && (
            <ul tw="space-y-3 w-full flex flex-col items-center">
               {parsed?.links?.map(
                  (link: { id: string; title: string; url: string }) => (
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

const USER = `
   query users($username: String!) {
      users(where: { username: { _eq: $username } }) {
         id
         name
         image
         links(
            order_by: { priority: asc }
            where: { is_active: { _eq: true } }
         ) {
            id
            url
            title
         }
      }
   }
`
