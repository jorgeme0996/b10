var express         = require("express"),
    router          = express.Router(),
    Evento          = require("../models/eventos")

router.get("/search", isLoggedIn, function(req,res){
    res.render("search/search", {currentUser: req.user});
});

router.post("/search/fecha/turno", isLoggedIn, function(req, res){
    var fecha = req.body.fecha,
        turno = req.body.turno;
    Evento.find({turno: turno, fecha: fecha}, function(err, foundEvento){
        if(err){
            console.log("Algo slaio mal buscando el evento");
            console.log(err);
        } else {
            res.render("search/show", {eventos: foundEvento, currentUser: req.user});
        }
    });
});

router.post("/search/incidente/fecha", isLoggedIn, function(req, res){
    var incidente   = req.body.incidente,
        fecha       = req.body.fecha;
    Evento.find({incidente: incidente, fecha: fecha}, function(err, foundEvento){
        if(err){
            console.log("Algo slaio mal buscando el evento");
            console.log(err); 
        } else {
            res.render("search/show", {eventos: foundEvento, currentUser: req.user});
        }
    });
})
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;  