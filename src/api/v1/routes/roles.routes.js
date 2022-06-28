const express = require('express')
const router = express.Router()
const controller = require("../controllers/roles.controller")

router.route('/').get(controller.getRoles)

module.exports = router
