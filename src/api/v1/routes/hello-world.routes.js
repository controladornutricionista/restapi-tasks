const express = require('express')
const httpStatus = require('http-status')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        message: 'Carga completa',
        body: {}
    })
})

module.exports = router
