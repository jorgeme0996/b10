var mongoose = require("mongoose");

var efemerideSchema = new mongoose.Schema({
    camActivas: Number,
    camInactivas: Number,
    camTotal: Number,
    dia: String,
    evento: String
});

var Efemeride = mongoose.model("Efemeride", efemerideSchema);
module.exports = Efemeride;