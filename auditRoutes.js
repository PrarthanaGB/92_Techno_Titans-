const express = require("express");
const router = express.Router();
const auditController = require("../controllers/auditController");
const authMiddleware = require("../middleware/auth");

// POST /api/audit/run
router.post("/run", authMiddleware, auditController.runAudit);

module.exports = router;