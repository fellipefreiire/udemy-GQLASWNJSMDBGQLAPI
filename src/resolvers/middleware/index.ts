import { skip } from 'graphql-resolvers'
import Task from '../../database/models/task'
import { isValidObjectId } from '../../database/util/index'

export const isAuthenticated = (_: {}, __: {}, { email }) => {
  if (!email) {
    throw new Error('Access denied! Please login to continue')
  }
  return skip
}

export const isTaskOwner = async (_: {}, { id }, { loggedInUserId }) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Task id')
    }
    const task = await Task.findById(id)
    if (!task) {
      throw new Error('Task not found')
    } else if (task.user.toString() !== loggedInUserId) {
      throw new Error('Not authorized as task owner')
    }
    return skip
  } catch (err) {
    console.log(err)
    throw err
  }
}
