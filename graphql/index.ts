import { gql } from '@apollo/client'

export const SUBSCRIPTIONS = {
   LINKS: gql`
      subscription links($where: links_link_bool_exp = {}) {
         links: links_link(where: $where, order_by: { created_at: desc }) {
            id
            url
            title
            is_active
            created_at
         }
      }
   `,
}

export const MUTATIONS = {
   LINK: {
      UPDATE: gql`
         mutation update_link($id: uuid!, $_set: links_link_set_input = {}) {
            update_link: update_links_link_by_pk(
               pk_columns: { id: $id }
               _set: $_set
            ) {
               id
            }
         }
      `,
      DELETE: gql`
         mutation delete_link($id: uuid!) {
            delete_link: delete_links_link_by_pk(id: $id) {
               id
            }
         }
      `,
   },
}
