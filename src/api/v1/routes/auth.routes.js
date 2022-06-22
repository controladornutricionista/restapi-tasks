const express = require('express')
const router = express.Router()
const controller = require("../controllers/auth.controller")
const { requireAuthMiddleware } = require("../middlewares/auth")

router.route('/login').post(controller.login)
router.route('/me').get(requireAuthMiddleware, controller.perfil)

module.exports = router