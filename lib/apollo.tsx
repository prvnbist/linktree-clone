import {
   split,
   ApolloClient,
   ApolloLink,
   InMemoryCache,
   createHttpLink,
   ApolloProvider,
} from '@apollo/client'
import React from 'react'
import fetch from 'node-fetch'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const wssLink = process.browser
   ? new WebSocketLink(
        new SubscriptionClient(process.env.NEXT_PUBLIC_GRAPHQL_WSS_ENDPOINT, {
           reconnect: true,
           connectionParams: {
              headers: {
                 'x-hasura-admin-secret':
                    process.env.NEXT_PUBLIC_GRAPHQL_SECRET,
              },
           },
        })
     )
   : null

const authLink = new ApolloLink((operation, forward) => {
   operation.setContext(({ headers }) => ({
      headers: {
         ...headers,
         'x-hasura-admin-secret': process.env.NEXT_PUBLIC_GRAPHQL_SECRET,
      },
   }))
   return forward(operation)
})

const httpLink = createHttpLink({
   fetch,
   uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
})

const splitLink = process.browser
   ? split(
        ({ query }) => {
           const definition = getMainDefinition(query)
           return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
           )
        },
        wssLink,
        authLink.concat(httpLink)
     )
   : authLink.concat(httpLink)

const client = new ApolloClient({
   link: splitLink,
   cache: new InMemoryCache(),
})

interface IApollo {
   children: React.ReactChild[] | React.ReactChildren[]
}

export const Apollo = ({ children }: IApollo) => {
   return <ApolloProvider client={client}>{children}</ApolloProvider>
}
