import React from 'react'
import tw from 'twin.macro'

import { Header } from './header'

interface ILayout {
   children: React.ReactChild | React.ReactChildren
}

export const Layout = ({ children }: ILayout) => {
   return (
      <div tw="h-screen w-full bg-gray-100">
         <Header />
         {children}
      </div>
   )
}
