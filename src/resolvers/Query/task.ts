import { tasks } from '../../constants'

export default {
  tasks: () => tasks,
  task: (_, { id }) => tasks.find(task => task.id === id)
}
