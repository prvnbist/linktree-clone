import React from 'react'
import tw from 'twin.macro'

import { Toggle } from './toggle'
import { useLink } from '../hooks'
import { ILink } from '../interfaces'
import * as Icon from '../assets/icons'

interface ILinksProps {
   link: ILink
}

// eslint-disable-next-line react/display-name
export const Link = React.forwardRef(
   ({ link, handle_props, is_dragging, ...props }: ILinksProps, ref) => {
      const { update_link, delete_link } = useLink()
      return (
         <li
            css={[
               tw`p-4 bg-white rounded shadow-sm flex items-center gap-4`,
               is_dragging && tw`border border-2 border-blue-500`,
            ]}
            {...props}
            ref={ref}
         >
            <span
               {...handle_props}
               className="group"
               tw="h-8 w-8 flex items-center justify-center rounded hover:(bg-gray-100)"
            >
               <Icon.Handle tw="group-hover:text-gray-700 stroke-current text-gray-400" />
            </span>
            <aside tw="flex items-center">
               <Toggle
                  id={link.id}
                  is_active={link.is_active}
                  on_change={() => {
                     update_link({
                        variables: {
                           id: link.id,
                           _set: { is_active: !link.is_active },
                        },
                     })
                  }}
               />
            </aside>
            <main>
               <h3 tw="text-lg font-medium text-gray-600">{link.title}</h3>
               <p tw="text-gray-500">{link.url}</p>
            </main>
            <aside tw="ml-auto">
               <button
                  title="Delete Link"
                  onClick={() => delete_link({ variables: { id: link.id } })}
                  tw="rounded h-10 w-10 flex items-center justify-center hover:(bg-red-100)"
               >
                  <Icon.Delete size={18} tw="stroke-current text-red-700" />
               </button>
            </aside>
         </li>
      )
   }
)
