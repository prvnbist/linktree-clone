import tw from 'twin.macro'

import { Toggle } from './toggle'
import { useLink } from '../hooks'
import { ILink } from '../interfaces'
import * as Icon from '../assets/icons'

interface ILinksProps {
   key: string
   link: ILink
}

export const Link = ({ link }: ILinksProps) => {
   const { update_link, delete_link } = useLink()
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
