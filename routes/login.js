import { Router } from "express";
import LoginController from "../controller/Login";

const router = Router();

router.post("/", LoginController.login);

export default router;
