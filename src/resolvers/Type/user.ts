import Task from '../../database/models/task'

export default {
  tasks: async ({ id }) => {
    try {
      const tasks = await Task.find({ user: id })
      return tasks
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
