const mongoose = require("mongoose")
const moment = require("moment-timezone")
const { timezone, publicFolderUploads } = require("../../../config")

const archivoSchema = new mongoose.Schema({
    peso: {
        type: Number,
        default: 0,
        required: [true, "El peso es requerido!"]
    },
    nombre: {
        type: String,
        required: false
    },
    nombreOriginal: {
        type: String,
        required: false
    },
    tipo: {
        type: String,
        required: [true, "El tipo de archivo es requerido!"],
        default: 'image'
    },
    source: {
        type: String,
        required: false,
        default: ''
    },
    path: {
        type: String,
        required: [true, "El path del archivo es requerido para eliminar posteriormente!"],
    },
    src: {
        type: String,
        required: false,
        default: ""
    },
    fechaCreacion: {
        type: Date,
        default: moment.tz(timezone)
    }
})

archivoSchema.pre("save", function (next) {
    const file = this
    this.src = `${publicFolderUploads}/${file.nombre}`
    next();
})

const model = mongoose.model("Archivos", archivoSchema)
module.exports = model