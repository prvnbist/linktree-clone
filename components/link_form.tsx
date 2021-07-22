import tw from 'twin.macro'
import { useState } from 'react'
import { useSession } from 'next-auth/client'

import { Button } from './button'
import { useLink } from '../hooks'

const is_valid_url = (url: string) => {
   const regex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
   return regex.test(url)
}

export const LinkForm = () => {
   const [session] = useSession()
   const { insert_link, inserting } = useLink()
   const [form, setForm] = useState({ title: '', url: '' })

   const on_change = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
   }

   const submit = async () => {
      await insert_link({
         variables: {
            object: {
               url: form.url,
               title: form.title,
               user_id: session?.user?.id,
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
         <Button.Text
            variant="solid"
            color="primary"
            on_click={submit}
            is_loading={inserting}
            is_disabled={!form.title || !form.url || !is_valid_url(form.url)}
         >
            Create Link
         </Button.Text>
      </section>
   )
}
