import { gql } from '@apollo/client'

export const SUBSCRIPTIONS = {
   LINKS: gql`
      subscription links($where: links_link_bool_exp = {}) {
         links: links_link(where: $where, order_by: { priority: asc }) {
            id
            url
            title
            priority
            is_active
            created_at
         }
      }
   `,
   USER: gql`
      subscription user($id: String!) {
         user: users_by_pk(id: $id) {
            id
            bio
            name
            email
            username
         }
      }
   `,
}

export const QUERIES = {
   USERS: gql`
      query users($where: users_bool_exp = {}) {
         users: users_aggregate(where: $where) {
            aggregate {
               count(columns: id)
            }
         }
      }
   `,
   USER_BY_USERNAME: gql`
      query users($username: String!) {
         users(where: { username: { _eq: $username } }) {
            id
            name
            image
            links(
               order_by: { priority: asc }
               where: { is_active: { _eq: true } }
            ) {
               id
               url
               title
            }
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
      INSERT: gql`
         mutation create_link($object: links_link_insert_input!) {
            create_link: insert_links_link_one(object: $object) {
               id
            }
         }
      `,
   },
   USER: {
      UPDATE: gql`
         mutation update_user($id: String!, $_set: users_set_input = {}) {
            update_user: update_users_by_pk(
               pk_columns: { id: $id }
               _set: $_set
            ) {
               id
            }
         }
      `,
   },
}
