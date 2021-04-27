import { skip } from 'graphql-resolvers'

export const isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new Error('Access denied! Please login to continue')
  }
  return skip
}
