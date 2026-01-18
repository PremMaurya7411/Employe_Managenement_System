import { Router } from "express";
import departmentController from "./department.controller.js";

const router = Router();

router.post("/", departmentController.create);
router.get("/", departmentController.list);
router.get("/:id", departmentController.getById);
router.put("/:id", departmentController.update);
router.delete("/:id", departmentController.delete);

export default router;
