import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    max: 50,
    min: 3,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{
    type: mongoose.Types.ObjectId,
    ref: "Task"
  }],
}, {
  timestamps: true,
  autoCreate: true,
  autoIndex: true
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
