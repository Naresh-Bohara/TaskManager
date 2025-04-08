import TaskModel from './task.model.js';
import UserModel from '../users/user.model.js';

class TaskService {
  createTask = async ({ title, description, important, userId }) => {
    const newTask = new TaskModel({ title, description, important, userId });
    await newTask.save();

    await UserModel.findByIdAndUpdate(userId, { $push: { tasks: newTask._id } });

    return newTask;
  }

  getAllTasks = async (userId) => {
    const user = await UserModel.findById(userId)
      .populate({
        path: 'tasks',
        options: { sort: { createdAt: -1 } }, 
      })
      .select('username email tasks'); 
  
    return user ? user.tasks : [];
  }

  deleteTask = async (taskId, userId) => {
    const task = await TaskModel.findById(taskId);
    if (!task) return null;

    const user = await UserModel.findById(userId);
    if (!user || !user.tasks.includes(taskId)) return null;

    await TaskModel.findByIdAndDelete(taskId);
    await UserModel.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    return true;
  }

  updateTask = async (taskId, userId, { title, description }) => {
    const task = await TaskModel.findById(taskId);
    if (!task || task.userId.toString() !== userId) throw { status: 403, message: 'Unauthorized task access' };

    task.title = title;
    task.description = description;
    await task.save();

    return task;
  }

  toggleImportant = async (taskId, userId) => {
    const task = await TaskModel.findById(taskId);
    if (!task || task.userId.toString() !== userId) throw { status: 403, message: 'Unauthorized task access' };

    task.important = !task.important;
    await task.save();

    return task;
  }

  toggleCompleted = async (taskId, userId) => {
    const task = await TaskModel.findById(taskId);
    if (!task || task.userId.toString() !== userId) throw { status: 403, message: 'Unauthorized task access' };

    task.complete = !task.complete;
    await task.save();

    return task;
  }

   getImportantTasks = async (userId) => {
    const user = await UserModel.findById(userId).populate({
      path: 'tasks',       
      match: { important: true }, 
    });
  
    return user ? user.tasks : [];  
  };

  getCompletedTasks = async (userId) => {
    const user = await UserModel.findById(userId).populate({
      path: 'tasks',
      match: { complete: true },
    });
    return user ? user.tasks : [];
  }

  getIncompleteTasks = async (userId) => {
    const user = await UserModel.findById(userId).populate({
      path: 'tasks',
      match: { complete: false },  // Only tasks that are incomplete
    });
    return user ? user.tasks : [];
  }
  

  getTaskProgress = async (userId) => {
    const user = await UserModel.findById(userId).populate('tasks');
    if (!user) throw { status: 404, message: 'User not found' };

    const totalTasks = user.tasks.length;
    const completedTasks = user.tasks.filter(task => task.complete).length;
    const pendingTasks = totalTasks - completedTasks;

    return { totalTasks, completedTasks, pendingTasks };
  }
}

export default new TaskService();
