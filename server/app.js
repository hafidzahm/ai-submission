const express = require("express");
const app = express();
const port = 3000;

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`AI Chatbot app listening on port ${port}`);
});
