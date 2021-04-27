import User from '../../database/models/user'

export default {
  user: async (parent, _: {}, { loaders }) => {
    try {
      // const user = await User.findById(parent.user)
      const user = await loaders.user.load(parent.user.toString())
      return user
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
