import tw from 'twin.macro'
import { useState } from 'react'

import { Toggle } from './toggle'
import { ILink } from '../interfaces'

interface ILinksProps {
   key: string
   link: ILink
   update_link?: (input: any) => void
}

export const Link = ({ link, update_link }: ILinksProps) => {
   return (
      <li
         key={link.id}
         tw="p-4 bg-white rounded shadow-sm flex items-center gap-4"
      >
         <aside tw="flex items-center">
            <Toggle
               id={link.id}
               is_active={link.is_active}
               on_change={() => {
                  update_link?.({
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
      </li>
   )
}
