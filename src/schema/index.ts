import { gql } from 'apollo-server-express'

import { user } from './user'
import { task } from './task'
import { query } from './query'
import { mutation } from './mutation'

export const typeDefs = gql`
  scalar Date
  ${user}
  ${task}
  ${query}
  ${mutation}
`
