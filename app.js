const express = require("express");
const cors = require("cors");

const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();


const auditRoutes = require("./routes/auditRoutes");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/history");


const app = express();
const report = require('./report.json');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/audit", auditRoutes);
app.use("/api/users", userRoutes);
app.use("/api/history", historyRoutes);


// Root
app.get("/audit", (req, res) => {
  res.json(report);
  res.send("🌐 Website Audit Tool Backend API Running...");
});

app.post('/api/audit', (req, res) => {

});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});