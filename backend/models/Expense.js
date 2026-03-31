import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  category: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Expense", expenseSchema);