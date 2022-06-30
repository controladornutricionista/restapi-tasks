const express = require("express");
const router = express.Router();
const cremas = require("../constants/cremas.json");
const httpStatus = require("http-status");

router.route("/cremas").get((req, res) => {
  res.status(httpStatus.OK).json({
    message: "Lista de de cremas!",
    body: cremas,
  });
});

module.exports = router;
