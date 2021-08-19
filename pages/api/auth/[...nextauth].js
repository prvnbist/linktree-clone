import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
   headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_GRAPHQL_SECRET,
   },
})

export default NextAuth({
   providers: [
      Providers.Google({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   pages: {
      signIn: '/login',
   },
   database: {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: {
         rejectUnauthorized: false,
      },
   },
   callbacks: {
      async session(session, token) {
         try {
            session.user.id = token.id

            const { user = {} } = await client.request(USER, { id: token.id })

            if (user.id) {
               session.user = {
                  ...session.user,
                  ...user,
               }
            }

            return session
         } catch (error) {
            console.log(error)
            return {}
         }
      },
   },
})

const USER = `
   query user($id: String!) {
      user: users_by_pk(id: $id) {
         id
         name
         email
         username
      }
   }
`
