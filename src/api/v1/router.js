const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require("path")
const folderRoutes = "routes"
const routesPath = path.join(__dirname, folderRoutes, "/")
const {
  removeFileExt
} = require('../../utils/remove-file-ext')
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./docs/document');


// Api docs
// router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Load routes
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeFileExt(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index'
    ? router.use(`/${routeFile}`, require(`./${folderRoutes}/${routeFile}.routes`))
    : ''
})

module.exports = router
