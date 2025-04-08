import { Router } from 'express';
import TaskController from './task.controller.js';
import checkLogin from '../../middlewares/auth.middleware.js';
import { bodyValidator } from '../../middlewares/request-validator.middleware.js';
import { taskSchema } from './task.validate.js';

const taskRouter = Router();

// checkLogin middleware globally to all routes
taskRouter.use(checkLogin);

// Routes with validation and controller methods
taskRouter.post("/", bodyValidator(taskSchema), TaskController.createTask);
taskRouter.get("/", TaskController.getAllTasks);
taskRouter.delete("/:id", TaskController.deleteTask);
taskRouter.put("/:id", bodyValidator(taskSchema), TaskController.updateTask);
taskRouter.put("/important/:id", TaskController.toggleImportant);
taskRouter.put("/completed/:id", TaskController.toggleCompleted);
taskRouter.get("/important", TaskController.getImportantTasks);
taskRouter.get("/completed", TaskController.getCompletedTasks);
taskRouter.get("/incomplete", TaskController.getIncompleteTasks);
taskRouter.get("/progress", TaskController.getTaskProgress);

export default taskRouter;
