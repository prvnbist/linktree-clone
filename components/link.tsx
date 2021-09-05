import React from 'react'
import tw from 'twin.macro'

import { Toggle } from './toggle'
import { useLink } from '../hooks'
import { ILink } from '../interfaces'
import * as Icon from '../assets/icons'

interface ILinkProps {
   link: ILink
   handle_props: any
   is_dragging: boolean
}

// eslint-disable-next-line react/display-name
export const Link = React.forwardRef(
   ({ link, handle_props, is_dragging, ...props }: ILinkProps, ref) => {
      const { update_link, delete_link } = useLink()
      return (
         <li
            css={[
               tw`p-2 md:p-4 bg-white rounded shadow-sm flex items-center gap-3 md:gap-4`,
               is_dragging && tw`border border-2 border-blue-500`,
            ]}
            {...props}
            ref={ref}
         >
            <span
               {...handle_props}
               className="group"
               tw="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded hover:(bg-gray-100)"
            >
               <Icon.Handle tw="group-hover:text-gray-700 stroke-current text-gray-400" />
            </span>
            <aside tw="hidden flex-shrink-0 md:flex items-center">
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
            <main tw="flex-1 flex md:items-center justify-between flex-col md:flex-row">
               <section>
                  <h3 tw="text-lg font-medium text-gray-600">{link.title}</h3>
                  <p tw="w-[calc(100% - 48px)] md:w-full text-gray-500 truncate">
                     {link.url}
                  </p>
               </section>
               <aside tw="md:justify-end w-full items-center mt-3 md:mt-0 flex gap-2">
                  <section tw="flex items-center flex-shrink-0 md:hidden">
                     <span tw="text-gray-600 inline-flex mr-1">
                        {link.is_active ? 'Hide' : 'Show'}
                     </span>
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
                  </section>
                  {!link.is_header && (
                     <>
                        <section tw="ml-auto order-2 md:order-none flex items-center flex-shrink-0">
                           <span tw="text-gray-600 inline-flex mr-1">NSFW</span>
                           <Toggle
                              id={link.id + link.title}
                              is_active={link.is_nsfw}
                              on_change={() => {
                                 update_link({
                                    variables: {
                                       id: link.id,
                                       _set: { is_nsfw: !link.is_nsfw },
                                    },
                                 })
                              }}
                           />
                        </section>
                        <a
                           href={link.url}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <button
                              title="View Link"
                              tw="rounded w-8 h-8 flex items-center justify-center hover:(bg-gray-100)"
                           >
                              <Icon.Goto
                                 size={18}
                                 tw="stroke-current text-gray-700"
                              />
                           </button>
                        </a>
                     </>
                  )}
                  <button
                     title="Delete Link"
                     onClick={() => delete_link({ variables: { id: link.id } })}
                     tw="rounded w-8 h-8 flex items-center justify-center hover:(bg-red-100)"
                  >
                     <Icon.Delete size={18} tw="stroke-current text-red-700" />
                  </button>
               </aside>
            </main>
         </li>
      )
   }
)
