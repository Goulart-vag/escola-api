import { Router } from "express";
import UserController from "../controller/User";
import loginVerify from "../middleware/loginVerify";

const router = Router();

router.get("/", UserController.index);
router.post("/", UserController.store);
router.get("/:id", loginVerify, UserController.show);
router.put("/", loginVerify, UserController.update);
router.delete("/", loginVerify, UserController.delete);

export default router;
