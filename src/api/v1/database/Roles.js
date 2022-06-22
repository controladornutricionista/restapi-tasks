const mongoose = require("mongoose")
const moment = require("moment-timezone")
const { timezone } = require("../../../config")

const rolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        default: "",
        unique: true,
        required: [true, "El nombre del rol es requerido!"]
    },
    descripcion: {
        type: String,
        required: false,
        default: ""
    },
    permisos: [ // Array de permisos con los siguientes atributos
        {
            nombre: {
                type: String,
                required: true,
            },
            descripcion: {
                type: String,
                required: false,
            },
            rutaPermiso: {
                type: String,
                required: true,
            }
        }
    ],
    fechaCreacion: {
        type: Date,
        default: moment.tz(timezone)
    }
})

const model = mongoose.model("Roles", rolSchema)
module.exports = model