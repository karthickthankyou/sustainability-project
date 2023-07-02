import { GraphQLClient } from 'graphql-request'

export const getGraphqlClient = async () => {
  return new GraphQLClient(
    'https://api.sustainability.iamkarthick.com/graphql',
    {},
  )
}
