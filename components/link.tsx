import tw from 'twin.macro'

import { ILink } from '../interfaces'

interface ILinksProps {
   link: ILink
}

export const Link = ({ link }: ILinksProps) => {
   return (
      <li key={link.id} tw="p-4 bg-white rounded shadow-sm">
         <h3 tw="text-lg font-medium text-gray-600">{link.title}</h3>
         <p tw="text-gray-500">{link.url}</p>
      </li>
   )
}
