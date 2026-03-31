import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const parseExpense = async (text) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `
Extract amount, category, and description from:
"${text}"

Return JSON only like:
{
  "amount": number,
  "category": "string",
  "description": "string"
}
        `,
      },
    ],
  });

  return response.choices[0].message.content;
};


// Insight for expense Tracker

export const generateInsights = async (expenses) => {
  const formatted = expenses
    .map((e) => `${e.category}: ${e.amount}`)
    .join("\n");

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `
Analyze this spending:

${formatted}

Return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanation.
Do NOT include text outside JSON.

Format:
{
  "topCategory": "string",
  "insights": ["point1", "point2"],
  "suggestion": "string",
  "warning": "string"
}
`
      },
    ],
  });

  return response?.choices?.[0].message.content || "No insights available";
};