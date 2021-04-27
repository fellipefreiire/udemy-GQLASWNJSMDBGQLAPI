import mongoose from 'mongoose'

interface UserDoc extends mongoose.Document {
  name: String
  email: String
  password: String
  tasks: mongoose.Schema.Types.ObjectId[]
  timestamps: boolean
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
  },
  {
    timestamps: true
  }
)

export default mongoose.model<UserDoc>('User', userSchema)
