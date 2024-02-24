import { Router } from "express"
import UserController from "../controller/User"

const router = Router()

router.get("/", UserController.index)
router.post("/", UserController.store)
router.get("/:id", UserController.show)
router.put("/:id", UserController.update)
router.delete("/:id", UserController.delete)

export default router
