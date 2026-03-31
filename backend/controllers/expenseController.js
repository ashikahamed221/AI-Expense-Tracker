import Expense from "../models/Expense.js";
import { parseExpense, generateInsights } from "../services/groqService.js";

export const addExpense = async (req, res) => {
  try {
    const { text } = req.body;

    const aiResult = await parseExpense(text);

     const jsonMatch = aiResult.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(400).json({ message: "Invalid AI response" });
    
    }

    const parsed = JSON.parse(jsonMatch[0]);

    res.json(parsed);

    const expense = await Expense.create({
      userId: req.user?.id || null,
      amount: parsed.amount,
      category: parsed.category,
      description: parsed.description,
    });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// insights
export const getInsights = async (req, res) => {
  try {
    const expenses = await Expense.find();

    if (expenses.length === 0) {
      return res.json({ message: "No expenses" });
    }

    const aiResult = await generateInsights(expenses);

   

    // ✅ Extract JSON
    const jsonMatch = aiResult.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.json({ message: "Invalid AI response" });
    }

    const parsed = JSON.parse(jsonMatch[0]);

   
    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating insights" });
  }
};