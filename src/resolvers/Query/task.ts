import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isTaskOwner } from '../middleware'

import Task from '../../database/models/task'
import { stringToBase64, base64ToString } from './../../helper/index'

export default {
  tasks: combineResolvers(
    isAuthenticated,
    async (_: {}, { cursor, limit = 10 }, { loggedInUserId }) => {
      try {
        const query = { user: loggedInUserId }
        if (cursor) {
          query['_id'] = {
            $lt: base64ToString(cursor)
          }
        }
        const tasks = await Task.find(query)
          .sort({ _id: -1 })
          .limit(limit + 1)

        const hasNextPage = tasks.length > limit
        const updatedTasks = hasNextPage ? tasks.slice(0, -1) : tasks

        return {
          taskFeed: tasks,
          pageInfo: {
            nextPageCursor: hasNextPage
              ? stringToBase64(updatedTasks[updatedTasks.length - 1].id)
              : null,
            hasNextPage
          }
        }
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
