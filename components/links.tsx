import tw from 'twin.macro'

import { ILinks } from '../interfaces'

export const Links = ({ children }: ILinks) => {
   return <ul tw="space-y-3">{children}</ul>
}
