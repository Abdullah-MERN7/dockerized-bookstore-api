import express from "express";
import { createBook, getAllBooks } from "../controllers/bookController.js";
const router = express.Router();

router.get("/", getAllBooks);
router.post("/", createBook);

export default router;
