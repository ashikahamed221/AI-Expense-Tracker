
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";


const app = express();

dotenv.config();
connectDB();


app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);


app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});