const express = require('express')
const router = express.Router()
const upload = require("../../../middlewares/upload")
const controller = require("../controllers/archivos.controller")

router.route('/').get(controller.listarArchivos)
router.route('/').post(upload.single("file"), controller.agregarArchivo)
router.route('/:fileId').delete(controller.eliminarArchivo)

module.exports = router
