import { combineResolvers } from 'graphql-resolvers'
import { tasks } from '../../constants'
import { isAuthenticated, isTaskOwner } from '../middleware'

import Task from '../../database/models/task'

export default {
  tasks: combineResolvers(
    isAuthenticated,
    async (_: {}, __: {}, { loggedInUserId }) => {
      try {
        const tasks = await Task.find({ user: loggedInUserId })
        return tasks
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  ),
  task: combineResolvers(
    isAuthenticated,
    isTaskOwner,
    async (_: {}, { id }) => {
      try {
        const task = await Task.findById(id)
        return task
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  )
}
