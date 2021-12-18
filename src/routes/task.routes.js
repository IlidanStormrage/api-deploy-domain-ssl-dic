import { Router } from "express";
import * as taskController from "../controllers/task.controller"; //*as importar todo eso como taskcontrollers

const router = Router();
router.post("/", taskController.createTask);

router.get("/", taskController.findAllTasks);
router.get("/done", taskController.findAllDoneTasks);

router.get("/:id", taskController.findOneTask);

router.delete("/:id", taskController.deleteTask);

router.put("/:id", taskController.updateTask);

export default router;
