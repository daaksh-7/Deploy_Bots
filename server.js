import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // loads API key

const app = express();

// allows frontend to talk to backend
app.use(cors());

// allows JSON data
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful health assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      reply: "Error connecting to AI"
    });
  }
});

// start server
app.get("/", (req, res) => {
  res.send("VitaAI Backend is running 🚀");
});