const mongoose = require("mongoose");
const moment = require("moment-timezone");
const { timezone } = require("../../../config");

const productoSchema = new mongoose.Schema({
    

    
});

const model = mongoose.model("Producto", productoSchema);
module.exports = model;
