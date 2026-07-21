import express from "express";

import {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
} from "../controllers/quoteController.js";

const router = express.Router();

router.post("/", createQuote);

router.get("/", getQuotes);

router.get("/:id", getQuote);

router.put("/:id", updateQuote);

router.delete("/:id", deleteQuote);

export default router;