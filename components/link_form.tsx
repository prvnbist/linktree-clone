import tw from 'twin.macro'
import { useState } from 'react'
import { useSession } from 'next-auth/client'

import { Button } from './button'
import { Toggle } from './toggle'
import { useLink } from '../hooks'

const is_valid_url = (url: string) => {
   const regex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
   return regex.test(url)
}

export const LinkForm = () => {
   const [session] = useSession()
   const { insert_link, inserting } = useLink()
   const [isHeader, setIsHeader] = useState(false)
   const [form, setForm] = useState({ title: '', url: '' })

   const on_change = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
   }

   const submit = () => {
      insert_link({
         variables: {
            object: {
               url: form.url,
               title: form.title,
               user_id: session?.user?.id,
               ...(isHeader && { is_header: true }),
            },
         },
      })
      setForm({ title: '', url: '' })
   }

   return (
      <section tw="bg-white shadow-sm rounded p-6 flex flex-col md:flex-row md:items-end gap-4 ">
         <fieldset tw="flex flex-col">
            <label htmlFor="title" tw="mb-1">
               Title
            </label>
            <input
               id="title"
               type="text"
               name="title"
               value={form.title}
               onChange={on_change}
               placeholder="Enter the title"
               tw="h-10 border border-gray-300 rounded px-3"
            />
         </fieldset>
         {!isHeader && (
            <fieldset tw="flex-1 flex flex-col">
               <label htmlFor="url" tw="mb-1">
                  URL
               </label>
               <input
                  id="url"
                  type="text"
                  name="url"
                  value={form.url}
                  onChange={on_change}
                  placeholder="Enter the url"
                  tw="h-10 border border-gray-300 rounded px-3"
               />
            </fieldset>
         )}
         <section tw="h-10 flex items-center ">
            <span tw="text-gray-500 inline-flex mr-2">As Header? </span>
            <Toggle
               id="is_header"
               is_active={isHeader}
               on_change={() => setIsHeader(!isHeader)}
            />
         </section>
         <Button.Text
            variant="solid"
            color="primary"
            on_click={submit}
            is_loading={inserting}
            is_disabled={
               isHeader
                  ? !form.title
                  : !form.title || !form.url || !is_valid_url(form.url)
            }
         >
            Create {isHeader ? 'Header' : 'Link'}
         </Button.Text>
      </section>
   )
}
