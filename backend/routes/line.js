const express = require("express");
const router = express.Router();
const TflApiController = require("../controllers/tflController");

router.get("/:line", TflApiController.LineIndex);

module.exports = router;
