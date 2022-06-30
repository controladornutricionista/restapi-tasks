const mongoose = require("mongoose");
const menus = require("../constants/menus.json")
const moment = require("moment-timezone");
const { timezone } = require("../../../config");

const pedidoSchema = new mongoose.Schema({

    producto:{
        type:Object,
        required: [true, "El producto es requerido"]
    },
    fechaPedido: {
        type: Date,
        default: moment.tz(timezone),
    },

    horaInicio: {
        type: String,
        required: [true, "La hora de inicio de la consulta es requerido!"]
    },

    usuario:{
        ref: "Usuarios",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "El usuario es requerido"]
    },

    numeroTarjeta:{
        type:String,
        required: [true, "El numero de tarjeta es requerido"]
    },

    estado:{
        type:String,
        required: [true, "El estado es requerido!"]
    }

    
});

const model = mongoose.model("Pedidos", pedidoSchema);
module.exports = model;
