import { gql } from '@apollo/client'

export const SUBSCRIPTIONS = {
   LINKS: gql`
      subscription links($where: links_link_bool_exp = {}) {
         links: links_link(where: $where) {
            id
            url
            title
            is_active
            created_at
         }
      }
   `,
}
