import { gql } from 'graphql-request'

export const manufacturers = gql`
  query manufacturers {
    manufacturers {
      id
    }
  }
`
