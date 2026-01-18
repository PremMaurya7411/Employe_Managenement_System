import { Router } from "express";
import leaveController from "./leave.controller.js";

const router = Router();

router.post(
  "/",
  leaveController.create
);

router.get(
  "/",
  leaveController.list
);

router.get(
  "/:id",
  leaveController.getById
);

router.put(
  "/:id",
  leaveController.update
);

router.delete(
  "/:id",
  leaveController.delete
);

export default router;