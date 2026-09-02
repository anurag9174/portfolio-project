require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");

const app = express();

const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/api", testRoutes);

app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});