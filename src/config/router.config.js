import { Router } from "express";
import authRouter from "../modules/auth/auth.route.js";
import taskRouter from "../modules/tasks/task.router.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/tasks", taskRouter)


export default router;
