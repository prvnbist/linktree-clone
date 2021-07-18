import tw from 'twin.macro'

import { ILinks } from '../interfaces'

export const Links = ({ children }: ILinks) => {
   return <ul tw="mt-4 space-y-3">{children}</ul>
}
