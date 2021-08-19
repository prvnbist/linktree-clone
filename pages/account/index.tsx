import { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useToasts } from 'react-toast-notifications'
import { useMutation, useSubscription } from '@apollo/client'

import { Button, Layout, Loader } from '../../components'
import { MUTATIONS, SUBSCRIPTIONS } from '../../graphql'

const Account = () => {
   const router = useRouter()
   const { addToast } = useToasts()
   const [session, loading] = useSession()
   const [userLoading, setUserLoading] = useState(true)
   const [form, setForm] = useState({
      name: '',
   })

   const [updateUser, { loading: updatingUser }] = useMutation(
      MUTATIONS.USER.UPDATE,
      {
         onCompleted: () => {
            addToast('Successfully update profile details!', {
               appearence: 'success',
            })
         },
         onError: () => {
            addToast('Failed to update profile details!', {
               appearence: 'error',
            })
         },
      }
   )

   useSubscription(SUBSCRIPTIONS.USER, {
      skip: loading || !session?.user?.id,
      variables: { id: session?.user?.id },
      onSubscriptionData: ({
         subscriptionData: { data: { user = {} } = {} } = {},
      } = {}) => {
         if (user?.id) {
            setForm({
               name: user.name || '',
            })
         }
         setUserLoading(false)
      },
      onError: () => {
         setUserLoading(false)
      },
   })

   useEffect(() => {
      if (!loading && !session?.user?.id) {
         router.push('/login')
      }
   }, [session, loading])

   const on_change = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
   }

   const onSave = async () => {
      updateUser({ variables: { _set: form, id: session?.user?.id } })
   }

   return (
      <Layout>
         <Styles.Container>
            <h1 tw="text-2xl text-gray-700 mb-3">Account Settings</h1>
            <section tw="bg-white rounded p-4 shadow">
               {loading || userLoading ? (
                  <div tw="w-full flex justify-center">
                     <Loader />
                  </div>
               ) : (
                  <>
                     <fieldset tw="mb-3 flex flex-col w-full md:w-5/12">
                        <label htmlFor="name" tw="text-gray-500 mb-1">
                           Name
                        </label>
                        <input
                           id="name"
                           type="text"
                           name="name"
                           value={form.name}
                           onChange={on_change}
                           placeholder="Enter your name"
                           tw="h-10 border border-gray-300 rounded px-3"
                        />
                     </fieldset>
                     <Button.Text
                        variant="solid"
                        color="success"
                        on_click={onSave}
                        is_loading={updatingUser}
                        is_disabled={!form.name}
                     >
                        Save
                     </Button.Text>
                  </>
               )}
            </section>
         </Styles.Container>
      </Layout>
   )
}

export default Account

const Styles = {
   Container: styled.div`
      margin: 16px auto;
      max-width: 980px;
      width: calc(100% - 40px);
   `,
}
