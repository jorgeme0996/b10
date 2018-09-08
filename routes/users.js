var express         = require("express"),
    router          = express.Router(),
    passport       = require("passport"),
    User            = require("../models/users");

router.get("/register", function(req, res){
    res.render("users/register");

});

router.post("/register", function(req, res){
     var newUser = new User({
        name: req.body.name,
        rol: req.body.rol,
        username:req.body.username
        });
    var newPassword = req.body.password;
    User.register(newUser, newPassword, function(err, user){
        if(err){
            console.log("Algo salio mal creandoun usuario");
            console.log(err)
            return res.redirect("/register")
        } else {
            console.log(user)
            return res.redirect("/register")
        }
    })
});

router.get("/login", function(req, res){
    res.render("users/login");
});

// Logica para que se hagan Log in 
router.post("/login", passport.authenticate("local" ,
    {
        successRedirect:"/",
        failureRedirect:"/login"

    }) ,function(req, res){
    
});

// middleware to check if is loggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

// Logica para que se hagan Log out 
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/login")
});

module.exports = router;