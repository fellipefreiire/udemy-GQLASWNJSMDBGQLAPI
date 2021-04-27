import { combineResolvers } from 'graphql-resolvers'

import Task from '../../database/models/task'
import User from '../../database/models/user'
import { isAuthenticated } from '../middleware'

export default {
  createTask: combineResolvers(
    isAuthenticated,
    async (_, { input }, { email }) => {
      try {
        const user = await User.findOne({ email })
        const task = new Task({ ...input, user: user.id })
        const result = await task.save()
        user.tasks.push(result.id)
        await user.save()

        return result
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  )
}
