import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from '../middleware'

import User from '../../database/models/user'

export default {
  user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User not found!')
      }
      console.log(user.tasks)
      return user
    } catch (err) {
      console.log(err)
      throw err
    }
  })
}
