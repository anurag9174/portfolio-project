const express = require("express");
const connectDB = require("./config/db");

const app = express();

const PORT = 5001;

// MongoDB connection
connectDB();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});