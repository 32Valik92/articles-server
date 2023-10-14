import { Router } from "express";

const router = Router();

router.get("/");
router.get("/:id");
router.post("/");
router.delete("/:id");
router.patch("/:id");

export const postRouter = router;
