const express = require('express')
const router = express.Router()
const controller=require("../controllers/menu.controller")

router.get("/",controller.listarMenu)









module.exports = router