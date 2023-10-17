import { Router } from "express";

import { postController } from "../controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", postController.getAll);
router.get("/:postId", postController.getById);
router.post("/", authMiddleware.checkAccessToken, postController.create);
router.delete(
  "/:postId",
  authMiddleware.checkAccessToken,
  postController.deleteById,
);
router.patch(
  "/:postId",
  authMiddleware.checkAccessToken,
  postController.updateById,
);

export const postRouter = router;
