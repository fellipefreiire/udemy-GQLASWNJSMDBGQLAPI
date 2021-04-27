export const task = `
extend type Query {
  tasks: [Task!]
  task(id: ID!): Task
}

extend type Mutation {
  createTask(input: createTaskInput!): Task
  updateTask(id: ID!, input: updateTaskInput!): Task
}

type Task {
  id: ID!
  name: String!
  completed: Boolean!
  user: User!
  createdAt: Date!
  updatedAt: Date!
}

input createTaskInput {
  name: String!
  completed: Boolean!
}

input updateTaskInput {
  name: String
  completed: Boolean
}
`
