var mongoose    = require("mongoose");
    moment      =require("moment");

var eventosSchema = new mongoose.Schema({
    folio: String,
    fecha: String,
    clave: String,
    turno: String,
    analista: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"    
        },
        username: String
    },
    incidente: String,
    fuenteReporte: String,
    horaReporte: String,
    ubicacionEntidad: String,
    zona: String,
    horaArribo: String,
    horaRetiro: String,
    torreta: String,
    alamo: String,
    otros: String,
    camaras: String,
    observaciones: String,
});

var Evento = mongoose.model("Evento", eventosSchema);
module.exports = Evento;
