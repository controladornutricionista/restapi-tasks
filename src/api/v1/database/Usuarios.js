const mongoose = require("mongoose")
const bcrypt = require("bcrypt") 
const moment = require("moment-timezone")
const { timezone } = require("../../../config")
const SALT_WORK_FACTOR = 10

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        unique: true,
        required: [true, "El usuario es requerido!"]
    },
    contrasena: {
        type: String,
        required: [true, "La contraseña es requerida!"]
    },
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
    rol: {
        ref: 'Roles',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    activo: {
        type: Boolean,
        required: false,
        default: false
    },
    imagen: {
        type: Object,
        required: false,
    },
    eliminado: {
        type: Boolean,
        required: false,
    },
    fechaCreacion: {
        type: Date,
        default: moment.tz(timezone)
    }
})

usuarioSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified('contrasena')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.contrasena, salt, function (err, hash) {
            if (err) return next(err);
            user.contrasena = hash;
            next();
        });
    });
})

const model = mongoose.model("Usuarios", usuarioSchema)
module.exports = model