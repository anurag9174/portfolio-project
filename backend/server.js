require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});