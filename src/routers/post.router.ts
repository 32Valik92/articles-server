import { Router } from "express";

import { postController } from "../controller";

const router = Router();

router.get("/", postController.getAll);
router.get("/:postId", postController.getById);
router.post("/");
router.delete("/:postId", postController.deleteById);
router.patch("/:postId");

export const postRouter = router;
