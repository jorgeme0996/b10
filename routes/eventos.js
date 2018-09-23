var express         = require("express"),
    router          = express.Router(),
    Evento          = require("../models/eventos");


router.get("/eventos/new", isLoggedIn, function(req, res){
    res.render("eventos/new",{currentUser: req.user})
});

router.post("/eventos/new", isLoggedIn, function(req,res){
    var folio               = req.body.folio,
        fecha               = req.body.fecha,
        clave               = req.body.clave,
        turno               = req.body.turno,
        analista            = {
            id: req.user.id,
            username: req.user.username
        },
        incidente           = req.body.incidente,
        fuenteReporte       = req.body.fuenteReporte,
        horaReporte         = req.body.horaReporte,
        ubicacionEntidad    = req.body.entidad,
        zona                = req.body.zona,
        horaArribo          = req.body.horaArribo,
        horaRetiro          = req.body.horaRetiro,
        torreta             = req.body.torreta,
        alamo               = req.body.alamo,
        otros               = req.body.otros,
        camaras             = req.body.camaras,
        observaciones       = req.body.observaciones;

    var newEvento = {
        folio: folio,
        fecha: fecha,
        clave: clave,
        turno: turno,
        analista: analista,
        incidente: incidente,
        fuenteReporte: fuenteReporte,
        horaReporte: horaReporte,
        ubicacionEntidad: ubicacionEntidad,
        zona: zona,
        horaArribo: horaArribo,
        horaRetiro: horaRetiro,
        torreta: torreta,
        alamo: alamo,
        otros: otros,
        camaras: camaras,
        observaciones: observaciones
    };
    Evento.create(newEvento, function(err, newlyEvento){
        if(err){
            console.log("Hubo un error a crear un evento");
            console.log(err);
        } else {
            console.log(newlyEvento)
            res.render("eventos/new");
        }
    });


});

router.get("/eventos",isLoggedIn , function(req,res){
   Evento.find({}, function(err, allEventos){
       if(err){
        console.log("Hubo un error a cargar la base de datos");
        console.log(err);
       } else {
        res.render("eventos/index", {eventos: allEventos, currentUser: req.user});
       }
   });
});

router.get("/eventos/:id", isLoggedIn, function(req, res){
    var id = req.params.id;
    Evento.findById(id, function(err, foundEvento){
        if(err){
            console.log("Algo salio mal encontrando el usuario");
            console.log(err);
        } else {
            //console.log(foundEvento)
            res.render("eventos/show", {evento: foundEvento, currentUser: req.user})
        }
    });
});

router.get("/eventos/:id/edit", isLoggedIn, function(req, res){
    var id = req.params.id
    Evento.findById(id, function(err, foundEvento){
        res.render("eventos/edit", {evento: foundEvento, currentUser: req.user}); 
    });  
});

// UPDATE CAMPGROUND ROUTE
router.put("/evento/:id/edit", isLoggedIn, function(req, res){
    var id = req.params.id;
    var dataUpdated = req.body.data;
    Evento.findByIdAndUpdate(id, dataUpdated, function(err, updatedEvento){
       if(err){
           res.redirect("/eventos");
       } else {
           //redirect somewhere(show page)
           console.log(updatedEvento)
           res.redirect("/eventos/" + id);
       }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
