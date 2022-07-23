const express = require('express')
const router = express.Router()
const controller = require("../controllers/pedidos.controller")

router.route('/:usuarioid').get(controller.getPedidos)
router.route('/').post(controller.crearPedido)
router.route('/:pedidoID').delete(controller.eliminarPedido)
router.route('/').get(controller.getAllPedidos)
module.exports = router
