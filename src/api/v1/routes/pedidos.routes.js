const express = require('express')
const router = express.Router()
const controller = require("../controllers/pedidos.controller")

router.route('/').get(controller.getPedidos)
router.route('/').post(controller.crearPedido)
router.route('/:pedidoID').delete(controller.eliminarPedido)

module.exports = router
