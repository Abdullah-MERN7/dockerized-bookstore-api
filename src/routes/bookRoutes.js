import express from "express";
import { createBook, getAllBooks } from "../controllers/bookController.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
const router = express.Router();

router.post("/", createBook);
router.get("/", rateLimiter, getAllBooks);

export default router;

