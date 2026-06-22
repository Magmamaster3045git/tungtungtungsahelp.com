import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req,res)=>{

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are Tungtungtungsahelp AI assistant. Be helpful and simple."
      },
      {
        role: "user",
        content: req.body.message
      }
    ]
  });

  res.json({
    reply: response.choices[0].message.content
  });
});

app.listen(3000, ()=>console.log("Server running on port 3000"));
