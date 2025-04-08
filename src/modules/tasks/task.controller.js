import TaskService from './task.service.js';
import { sendSuccess, sendError } from '../../utils/response.util.js';

class TaskController {
  createTask = async (req, res) => {
    try {
      const { title, description, important = false } = req.body;
      const userId = req.user.id;  // Extract user ID from the request (auth middleware ensures the user is logged in)

      const newTask = await TaskService.createTask({ title, description, important, userId });
      return sendSuccess(res, 'Task created successfully!', newTask, 201);
    } catch (err) {
      return sendError(res, err);
    }
  }

  getAllTasks = async (req, res) => {
    try {
      const userId = req.user.id;
      const tasks = await TaskService.getAllTasks(userId);
      return sendSuccess(res, 'Tasks fetched successfully!', tasks);
    } catch (err) {
      return sendError(res, err);
    }
  }

  deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.user.id; // Extract user ID from the request (auth middleware ensures the user is logged in)

      const result = await TaskService.deleteTask(taskId, userId);
      if (!result) {
        return sendError(res, { status: 404, message: 'Task not found or unauthorized' });
      }

      return sendSuccess(res, 'Task deleted successfully!');
    } catch (err) {
      return sendError(res, err);
    }
  }

  updateTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const { title, description } = req.body;
      const userId = req.user.id;

      const updatedTask = await TaskService.updateTask(taskId, userId, { title, description });
      return sendSuccess(res, 'Task updated successfully!', updatedTask);
    } catch (err) {
      return sendError(res, err);
    }
  } 

  toggleImportant = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;

      const updatedTask = await TaskService.toggleImportant(taskId, userId);
      return sendSuccess(res, 'Task importance updated.', updatedTask);
    } catch (err) {
      return sendError(res, err);
    }
  }
     
  toggleCompleted = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;

      const updatedTask = await TaskService.toggleCompleted(taskId, userId);
      return sendSuccess(res, 'Task completion updated.', updatedTask);
    } catch (err) {
      return sendError(res, err);
    }
  }

   getImportantTasks = async (req, res) => {
    try {
      const userId = req.user.id;  // Extract user ID from req.user, which was set by the checkLogin middleware
      const tasks = await TaskService.getImportantTasks(userId);  // Call the service to get important tasks
      return sendSuccess(res, 'Important tasks fetched successfully!', tasks);
    } catch (err) {
      return sendError(res, err);
    }
  };

  getCompletedTasks = async (req, res) => {
    try {
      const userId = req.user.id;
      const tasks = await TaskService.getCompletedTasks(userId);
      return sendSuccess(res, 'Completed tasks fetched successfully!', tasks);
    } catch (err) {
      return sendError(res, err);
    }
  }

  getIncompleteTasks = async (req, res) => {
    try {
      const userId = req.user.id;
      const tasks = await TaskService.getIncompleteTasks(userId);
      return sendSuccess(res, 'Incomplete tasks fetched successfully!', tasks);
    } catch (err) {
      return sendError(res, err);
    }
  }
  

  getTaskProgress = async (req, res) => {
    try {
      const userId = req.user.id;
      const progress = await TaskService.getTaskProgress(userId);
      return sendSuccess(res, 'Task progress fetched successfully!', progress);
    } catch (err) {
      return sendError(res, err);
    }
  }
}

export default new TaskController();
