import User from '../../database/models/user'

export default {
  user: async parent => {
    try {
      const user = await User.findById(parent.user)
      return user
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
