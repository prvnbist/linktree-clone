import React from 'react'
import { useMutation } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'

import { MUTATIONS } from '../graphql'

const Context = React.createContext({})

interface ILinkProvider {
   children: React.ReactChild | React.ReactChildren
}

export const LinkProvider = ({ children }: ILinkProvider) => {
   const { addToast } = useToasts()
   const [insert_link, { loading: inserting }] = useMutation(
      MUTATIONS.LINK.INSERT,
      {
         onCompleted: () => {
            addToast('Successfully created the link!', {
               appearance: 'success',
            })
         },
         onError: () => {
            addToast('Failed to create the link, please try again!', {
               appearance: 'error',
            })
         },
      }
   )
   const [update_link] = useMutation(MUTATIONS.LINK.UPDATE, {
      onCompleted: () => {
         addToast('Successfully updated the link!', {
            appearance: 'success',
         })
      },
      onError: () => {
         addToast('Failed to update the link, please try again!', {
            appearance: 'error',
         })
      },
   })
   const [delete_link] = useMutation(MUTATIONS.LINK.DELETE, {
      onCompleted: () => {
         addToast('Successfully deleted the link!', {
            appearance: 'success',
         })
      },
      onError: () => {
         addToast('Failed to delete the link, please try again!', {
            appearance: 'error',
         })
      },
   })
   return (
      <Context.Provider
         value={{ inserting, insert_link, update_link, delete_link }}
      >
         {children}
      </Context.Provider>
   )
}

export const useLink = () => React.useContext(Context)
