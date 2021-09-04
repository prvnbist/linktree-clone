import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useToasts } from 'react-toast-notifications'
import { useCallback, useState, useEffect } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import {
   Droppable,
   Draggable,
   DropResult,
   DragDropContext,
} from 'react-beautiful-dnd'

import { ILink } from '../../interfaces'
import { LinkProvider } from '../../hooks'
import { Links } from '../../components/links'
import * as Illo from '../../assets/illustrations'
import { MUTATIONS, SUBSCRIPTIONS } from '../../graphql'
import { Layout, Loader, Link, LinkForm } from '../../components'

const Admin = () => {
   const router = useRouter()
   const { addToast } = useToasts()
   const [session, loading] = useSession()
   const [links, setLinks] = useState<ILink[]>([])
   const [update_link] = useMutation(MUTATIONS.LINK.UPDATE, {
      onError: () => {
         addToast('Failed to reorder link, please try again', {
            appearance: 'error',
         })
      },
   })
   const { loading: loading_links } = useSubscription(SUBSCRIPTIONS.LINKS, {
      skip: !session?.user?.id,
      variables: {
         where: { user_id: { _eq: session?.user?.id } },
      },
      onSubscriptionData: result => {
         const { links: list = [] } = result.subscriptionData.data
         if (list.length > 0) {
            setLinks(list)
         }
      },
   })

   useEffect(() => {
      if (!loading && !session) {
         router.push('/login')
      }
   }, [router, session, loading])

   const onDragEnd = useCallback(
      (reordered: DropResult) => {
         if (!reordered.destination) return

         const source_index = reordered.source.index
         const destination_index = reordered.destination.index

         if (source_index === destination_index) return

         const source_link = links[source_index]
         const dest_link = links[destination_index]

         let new_priority = 0

         if (destination_index === 0) {
            const [first_link] = links
            new_priority = first_link.priority / 2
         } else if (destination_index === links.length - 1) {
            new_priority = links[destination_index - 1].priority + 10000
         } else {
            new_priority =
               source_index > destination_index
                  ? (links[destination_index - 1].priority +
                       dest_link.priority) /
                    2
                  : (links[destination_index + 1].priority +
                       dest_link.priority) /
                    2
         }

         update_link({
            variables: {
               id: source_link.id,
               _set: {
                  priority: Math.ceil(new_priority),
               },
            },
         })

         const items = links
         const [item] = items.splice(reordered.source.index, 1)
         items.splice(reordered.destination.index, 0, item)
         setLinks(items)
      },
      [links, update_link]
   )

   return (
      <Layout>
         <LinkProvider>
            <main tw="overflow-hidden p-3">
               {session?.user?.username && (
                  <section tw="w-full text-right mb-3">
                     My page:{' '}
                     <a
                        href={
                           new URL(window?.location?.origin).origin +
                           '/' +
                           session?.user?.username
                        }
                        title="View Page"
                        target="_blank"
                        rel="noopener noreferrer"
                        tw="text-indigo-500 underline"
                     >
                        {new URL(window?.location?.origin).origin +
                           '/' +
                           session?.user?.username}
                     </a>
                  </section>
               )}
               <LinkForm />
               {loading || loading_links ? (
                  <div tw="mt-4 w-full flex justify-center">
                     <Loader color="#2563eb" />
                  </div>
               ) : (
                  <>
                     {links.length === 0 ? (
                        <div tw="mt-4 w-full h-full flex justify-center pt-12">
                           <Illo.Empty />
                        </div>
                     ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                           <Droppable droppableId="links">
                              {provided => (
                                 <Links
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                 >
                                    {links.map((link: ILink, index: number) => (
                                       <Draggable
                                          key={link.id}
                                          index={index}
                                          draggableId={link.id}
                                       >
                                          {(node: any, snapshot: any) => (
                                             <Link
                                                link={link}
                                                ref={node.innerRef}
                                                {...node.draggableProps}
                                                is_dragging={
                                                   snapshot.isDragging
                                                }
                                                handle_props={{
                                                   ...node.dragHandleProps,
                                                }}
                                             />
                                          )}
                                       </Draggable>
                                    ))}
                                 </Links>
                              )}
                           </Droppable>
                        </DragDropContext>
                     )}
                  </>
               )}
            </main>
         </LinkProvider>
      </Layout>
   )
}

export default Admin
