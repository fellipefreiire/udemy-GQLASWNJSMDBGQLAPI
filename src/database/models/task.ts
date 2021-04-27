import mongoose from 'mongoose'

interface TaskDoc extends mongoose.Document {
  name: String
  completed: Boolean
  user: mongoose.Schema.Types.ObjectId[]
  timestamps: boolean
}

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<TaskDoc>('Task', taskSchema)
