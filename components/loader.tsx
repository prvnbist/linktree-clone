import React from 'react'
import { css, styled } from 'twin.macro'

interface ILoader {
   color?: string
}

export const Loader = ({ color = 'blue' }: ILoader) => {
   return (
      <Styles.Loader
         id="L4"
         x="0px"
         y="0px"
         version="1.1"
         viewBox="0 0 40 8"
         enableBackground="new 0 0 0 0"
         xmlns="http://www.w3.org/2000/svg"
      >
         <circle fill={color} stroke="none" cx="4" cy="4" r="4">
            <animate
               dur="1s"
               begin="0.1"
               values="0;1;0"
               attributeName="opacity"
               repeatCount="indefinite"
            />
         </circle>
         <circle fill={color} stroke="none" cx="20" cy="4" r="4">
            <animate
               dur="1s"
               begin="0.2"
               values="0;1;0"
               repeatCount="indefinite"
               attributeName="opacity"
            />
         </circle>
         <circle fill={color} stroke="none" cx="36" cy="4" r="4">
            <animate
               dur="1s"
               begin="0.3"
               values="0;1;0"
               repeatCount="indefinite"
               attributeName="opacity"
            />
         </circle>
      </Styles.Loader>
   )
}

const Styles = {
   Loader: styled.svg(css`
      width: 40x;
      height: 8px;
   `),
}
