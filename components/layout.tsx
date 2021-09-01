import React from 'react'
import tw from 'twin.macro'

import { Header } from './header'

interface ILayout {
   children: React.ReactChild | React.ReactChildren
}

export const Layout = ({ children }: ILayout) => {
   return (
      <div tw="h-screen w-full bg-gray-100 flex flex-col">
         <Header />
         <div tw="flex-1 bg-gray-100">{children}</div>
      </div>
   )
}
