import tw from 'twin.macro'
import { useMutation } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'

import { ILinks } from '../interfaces'
import { MUTATIONS } from '../graphql'

export const Links = ({ children }: ILinks) => {
   const { addToast } = useToasts()
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
      <ul tw="space-y-3">
         {children.length === 1
            ? {
                 ...children,
                 props: {
                    update_link,
                    delete_link,
                    ...children.props,
                 },
              }
            : children.map(node => ({
                 ...node,
                 props: { update_link, delete_link, ...node.props },
              }))}
      </ul>
   )
}
