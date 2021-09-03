import React from 'react'
import tw from 'twin.macro'

import { ILinks } from '../interfaces'

// eslint-disable-next-line react/display-name
export const Links = React.forwardRef(({ children, ...props }: ILinks, ref) => {
   return (
      <ul tw="mt-4 space-y-3" {...props} ref={ref}>
         {children}
      </ul>
   )
})
