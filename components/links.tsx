import tw from 'twin.macro'

import { ILinks } from '../interfaces'
import { LinkProvider } from '../hooks'

export const Links = ({ children }: ILinks) => {
   return (
      <LinkProvider>
         <ul tw="space-y-3">{children}</ul>
      </LinkProvider>
   )
}
