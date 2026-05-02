const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.get("/wordle/today", async (req, res) => {
    try {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        
        const date = `${year}-${month}-${day}`;
        const url = `https://www.nytimes.com/svc/wordle/v2/${date}.json`;

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
              error: "Failed to fetch Wordle data"
            });
        }

        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server error"
        });
    }
});

PORT = 5000

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
})