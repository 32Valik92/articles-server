import { Router } from "express";

import { postController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { PostValidator } from "../validator";

const router = Router();

router.get("/", postController.getAll);

router.get(
  "/:postId",
  commonMiddleware.isIdValid("postId"),
  postController.getById,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(PostValidator.postCreate),
  authMiddleware.checkAccessToken,
  postController.create,
);

router.delete(
  "/:postId",
  commonMiddleware.isIdValid("postId"),
  authMiddleware.checkAccessToken,
  postController.deleteById,
);

router.patch(
  "/:postId",
  commonMiddleware.isIdValid("postId"),
  commonMiddleware.isBodyValid(PostValidator.postUpdate),
  authMiddleware.checkAccessToken,
  postController.updateById,
);

export const postRouter = router;
