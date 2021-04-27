import { users } from '../../constants'

export default {
  user: ({ userId }) => {
    return users.find(user => user.id === userId)
  }
}
