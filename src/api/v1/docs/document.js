const m2s = require('mongoose-to-swagger')
const path = require("path")
const dbFilePath = path.join(__dirname, "..", "database")
const fs = require("fs")
const baseDocument = require("./docs.json")
const { removeFileExt } = require('../../../utils/remove-file-ext')

fs.readdirSync(dbFilePath).forEach((file) => {
    const modelFileName = removeFileExt(file)
    if (modelFileName != 'connection') {
        const model = require(path.join(dbFilePath, modelFileName))
        baseDocument.definitions[modelFileName] = m2s(model)
    }
})

module.exports = baseDocument
