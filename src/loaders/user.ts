import User from '../database/models/user'

export const batchUsers = async userIds => {
  console.log('keys: ', userIds)
  const users = await User.find({ _id: { $in: userIds } })
  return userIds.map(userId => users.find(user => user.id === userId))
}
