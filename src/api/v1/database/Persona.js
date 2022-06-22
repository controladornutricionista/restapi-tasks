const mongoose = require("mongoose")
const moment = require("moment-timezone")
const { timezone } = require("../../../config")

const personaSchema = new mongoose.Schema({
    nombres: {
        type: String,
        default: "",
        required: [true, "El nombre de la persona es requerido!"]
    },
    apellidos: {
        type: String,
        default: "bol",
        required: [true, "Los apellidos de la persona son requeridos!"]
    },
    dni: {
        type: String,
        required: [true, "El DNI de la persona es requerido!"],
        default: ''
    },
    celular: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        default: ""
    },
    direccion: {
        type: String,
        required: [true, "La direccion es requerida"],
        default: ""
    },

    fechaCreacion: {
        type: Date,
        default: moment.tz(timezone)
    }
})

const model = mongoose.model("Personas", personaSchema)
module.exports = model