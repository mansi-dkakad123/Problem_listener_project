import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simple chatbot mock (replace with API Setu or AI model)
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  // Example: static govt services mapping
  if (message.toLowerCase().includes("pan card")) {
    return res.json({ reply: "You can apply for a PAN card at https://www.onlineservices.nsdl.com" });
  }
  if (message.toLowerCase().includes("passport")) {
    return res.json({ reply: "Apply for a passport here: https://www.passportindia.gov.in" });
  }

  res.json({ reply: "I don't have info on that yet, please check govt portal." });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
