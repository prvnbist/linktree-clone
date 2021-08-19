import React from 'react'
import tw, { css, styled } from 'twin.macro'

interface IButton {
   title?: string
   is_loading?: boolean
   is_disabled?: boolean
   variant: 'solid' | 'outline' | 'ghost'
   children: React.ReactNode | React.ReactChildren
   left?: React.ReactNode | React.ReactChildren | null
   right?: React.ReactNode | React.ReactChildren | null
   on_click: (event: React.MouseEvent<HTMLButtonElement>) => void
   color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
}

const Text = ({
   color,
   variant,
   children,
   on_click,
   title = '',
   is_loading = false,
   is_disabled = false,
}: IButton) => (
   <Styles.Text
      {...{
         color,
         title,
         variant,
         onClick: on_click,
         disabled: is_disabled || is_loading,
      }}
   >
      <span css={[is_loading && tw`opacity-0`]}>{children}</span>
      <Spinner is_loading={is_loading} />
   </Styles.Text>
)

const Icon = ({
   color,
   variant,
   children,
   on_click,
   title = '',
   is_disabled = false,
   is_loading = false,
}: IButton) => (
   <Styles.Icon
      {...{
         color,
         title,
         variant,
         onClick: on_click,
         disabled: is_disabled || is_loading,
      }}
   >
      <span css={[is_loading && tw`opacity-0`]}>{children}</span>
      <Spinner is_loading={is_loading} />
   </Styles.Icon>
)

const Combo = ({
   color,
   variant,
   children,
   on_click,
   title = '',
   left = null,
   right = null,
   is_disabled = false,
   is_loading = false,
}: IButton) => (
   <Styles.Combo
      {...{
         title,
         color,
         variant,
         on_click,
         left: Boolean(left),
         right: Boolean(right),
         disabled: is_disabled || is_loading,
      }}
   >
      <div css={[is_loading && tw`opacity-0`]}>
         {left && <span>{left}</span>}
         {children}
         {right && <span>{right}</span>}
      </div>
      <Spinner is_loading={is_loading} />
   </Styles.Combo>
)

export const Button = {
   Text,
   Icon,
   Combo,
}

interface IStyle {
   variant: 'solid' | 'outline' | 'ghost'
   left?: React.ReactNode | React.ReactChildren | null
   right?: React.ReactNode | React.ReactChildren | null
   color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
}

const Styles = {
   Text: styled.button(
      ({ variant, color }: IStyle) => css`
         ${tw`px-4 h-10 rounded relative`};
         ${variant_selector(variant, color)};
         &[disabled] {
            ${tw`cursor-not-allowed`};
         }
      `
   ),
   Icon: styled.button(
      ({ variant, color }: IStyle) => css`
         ${tw`w-10 h-10 rounded flex items-center justify-center relative`};
         ${variant_selector(variant, color)};
         &[disabled] {
            ${tw`cursor-not-allowed`};
         }
      `
   ),
   Combo: styled.button(
      ({ left, right, variant, color }: IStyle) => css`
         ${tw`h-10 rounded relative`};
         ${!left && tw`pl-4`};
         ${!right && tw`pr-4`};
         ${variant_selector(variant, color)};
         div {
            ${tw`flex items-center`};
            span {
               ${tw`h-full w-10 flex items-center justify-center`};
            }
         }
         &[disabled] {
            ${tw`cursor-not-allowed`};
         }
      `
   ),
}

const variant_selector = (variant: string, color: string) => {
   switch (variant) {
      case 'solid':
         return css`
            &[disabled] {
               ${color === 'primary' && tw`bg-indigo-400 text-white`};
               ${color === 'secondary' && tw`bg-gray-500 text-white`};
               ${color === 'success' && tw`bg-green-400 text-white`};
               ${color === 'danger' && tw`bg-red-300 text-white`};
               ${color === 'warning' && tw`bg-yellow-300 text-white`};
            }
            :not([disabled]) {
               ${color === 'primary' && tw`bg-indigo-600 text-white`};
               ${color === 'secondary' && tw`bg-gray-700 text-white`};
               ${color === 'success' && tw`bg-green-600 text-white`};
               ${color === 'danger' && tw`bg-red-500 text-white`};
               ${color === 'warning' && tw`bg-yellow-500 text-white`};
               ${color === 'primary' &&
               tw`hover:(bg-indigo-700) focus:(bg-indigo-700)`};
               ${color === 'secondary' &&
               tw`hover:(bg-gray-800) focus:(bg-gray-800)`};
               ${color === 'success' &&
               tw`hover:(bg-green-700) focus:(bg-green-700)`};
               ${color === 'danger' &&
               tw`hover:(bg-red-600) focus:(bg-red-600)`};
               ${color === 'warning' &&
               tw`hover:(bg-yellow-600) focus:(bg-yellow-600)`};
            }
         `
      case 'outline':
         return css`
            ${tw`border`}
            &[disabled] {
               ${color === 'primary' && tw`border-indigo-500 text-indigo-400`};
               ${color === 'secondary' && tw`border-gray-600 text-gray-600`};
               ${color === 'success' && tw`border-green-500 text-green-500 `};
               ${color === 'danger' && tw`border-red-400 text-red-400`};
               ${color === 'warning' && tw`border-yellow-400 text-yellow-400`};
            }

            :not([disabled]) {
               ${color === 'primary' && tw`border-indigo-600 text-indigo-600`};
               ${color === 'secondary' && tw`border-gray-700 text-gray-700`};
               ${color === 'success' && tw`border-green-600 text-green-600 `};
               ${color === 'danger' && tw`border-red-500 text-red-500`};
               ${color === 'warning' && tw`border-yellow-500 text-yellow-500`};
               ${color === 'primary' &&
               tw`hover:(bg-indigo-600 text-white) focus:(bg-indigo-600 text-white)`};
               ${color === 'secondary' &&
               tw`hover:(bg-gray-700 text-white) focus:(bg-gray-700 text-white)`};
               ${color === 'success' &&
               tw`hover:(bg-green-600 text-white) focus:(bg-green-600 text-white)`};
               ${color === 'danger' &&
               tw`hover:(bg-red-500 text-white) focus:(bg-red-500 text-white)`};
               ${color === 'warning' &&
               tw`hover:(bg-yellow-500 text-white) focus:(bg-yellow-500 text-white)`};
            }
         `
      case 'ghost':
         return css`
            &[disabled] {
               ${color === 'primary' && tw`bg-indigo-100 text-indigo-500`};
               ${color === 'secondary' && tw`bg-gray-100 text-gray-500`};
               ${color === 'success' && tw`bg-green-100 text-green-500`};
               ${color === 'danger' && tw`bg-red-100 text-red-500`};
               ${color === 'warning' && tw`bg-yellow-100 text-yellow-500`};
            }

            :not([disabled]) {
               ${color === 'primary' && tw`bg-indigo-200 text-indigo-900`};
               ${color === 'secondary' && tw`bg-gray-200 text-gray-900`};
               ${color === 'success' && tw`bg-green-200 text-green-900`};
               ${color === 'danger' && tw`bg-red-200 text-red-900`};
               ${color === 'warning' && tw`bg-yellow-200 text-yellow-900`};
               ${color === 'primary' &&
               tw`hover:(bg-indigo-300) focus:(bg-indigo-300)`};
               ${color === 'secondary' &&
               tw`hover:(bg-gray-300) focus:(bg-gray-300)`};
               ${color === 'success' &&
               tw`hover:(bg-green-300) focus:(bg-green-300)`};
               ${color === 'danger' &&
               tw`hover:(bg-red-300) focus:(bg-red-300)`};
               ${color === 'warning' &&
               tw`hover:(bg-yellow-300) focus:(bg-yellow-300)`};
            }
         `

      default:
         return ''
   }
}

const Spinner = ({ is_loading = false }) => {
   if (!is_loading) return null
   return (
      <span
         tw="absolute animate-spin"
         style={{ left: 'calc(50% - 8px)', top: 'calc(50% - 8px)' }}
      >
         <SpinnerIcon tw="stroke-current" />
      </span>
   )
}

const SpinnerIcon = ({ size = 18, ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
   >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
   </svg>
)
