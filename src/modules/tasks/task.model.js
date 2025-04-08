import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    max: 100,
    min: 3,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
  autoCreate: true,
  autoIndex: true,
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
