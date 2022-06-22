const express = require("express")
const app = express()
const { port, publicFolder, publicFolderUploads } = require("./config")
const cors = require("cors")
const bodyParser = require("body-parser")
const error = require("./middlewares/error")
const helmet = require("helmet")
const path = require("path")
const compression = require("compression")
const routes = require("./api/v1/router")
const fs = require("fs");
const uploadsDir = path.join(__dirname, "..", publicFolder, publicFolderUploads) 

if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// sets
app.set("port", port)

// static
app.use(express.static(path.join(__dirname, "..", publicFolder)))

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
}))
app.use(bodyParser.json({
    limit: '20mb',
    extended: true
}))
app.use(helmet())
app.use(compression())


// routes
app.use('/check', (req, res) => res.send('OK'))
app.use('/api/v1', routes)
// app.use('/*', (req, res) => res.send('Not Found'))
app.use(error.converter)
app.use(error.notFound)
app.use(error.handler)

module.exports = app