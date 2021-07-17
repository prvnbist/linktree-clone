import React from 'react'
import tw from 'twin.macro'
import { styled } from '@stitches/react'

import { Loader } from './loader'

interface IButton {
   is_loading?: boolean
   type: 'solid' | 'outline'
   variant: 'primary' | 'danger'
   children: React.ReactNode[] | React.ReactChildren[]
   on_click: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({
   on_click,
   children,
   type = 'solid',
   is_loading = false,
   variant = 'primary',
}: IButton) => {
   return (
      <Styles.Button
         type={type}
         variant={variant}
         onClick={on_click}
         disabled={is_loading}
         is_loading={is_loading}
      >
         <Styles.Children is_loading={is_loading} variant={variant}>
            {children}
         </Styles.Children>
         {is_loading && (
            <Styles.Loader>
               <Loader color={type === 'solid' ? '#fff' : '#86898e'} />
            </Styles.Loader>
         )}
      </Styles.Button>
   )
}

const Styles = {
   Button: styled('button', {
      ...tw`relative rounded px-6 h-10`,
      variants: {
         is_loading: {
            true: tw`cursor-not-allowed`,
         },
         type: {
            solid: tw``,
            outline: tw`border`,
         },
         variant: {
            primary: tw`bg-blue-600`,
            danger: tw`border-red-400`,
         },
      },
   }),
   Children: styled('span', {
      variants: {
         is_loading: { true: tw`opacity-0` },
         variant: {
            primary: tw`text-white`,
            danger: tw`text-red-700`,
         },
      },
   }),
   Loader: styled('span', {
      position: 'absolute',
      left: 'calc(50% - 24px)',
      top: 'calc(50% - 4px)',
   }),
}
