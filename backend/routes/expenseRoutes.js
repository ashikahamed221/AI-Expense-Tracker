import express from "express";
import { addExpense, getExpenses, getInsights } from "../controllers/expenseController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/",protect,addExpense);
router.get("/", getExpenses);
router.get("/insights", getInsights);

export default router;