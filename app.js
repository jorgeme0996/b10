var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/users"),
    port            = 4000

var efemeridesRoutes    = require("./routes/efemerides"),
    usersRoutes         = require("./routes/users"),
    eventosRoutes       = require("./routes/eventos"),
    searchRoutes        = require("./routes/search");

//seedDB
// mongoose.connect("mongodb://localhost/ORWELL", {useNewUrlParser: true});
mongoose.connect("mongodb://jorge:jorge007@ds249942.mlab.com:49942/base10", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(require("express-session")({
    secret: "Payton es la mejor",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(usersRoutes);
app.use(eventosRoutes);
app.use(searchRoutes)
// app.use(efemeridesRoutes);

app.get("/", function(req, res){
    res.render("landing", {currentUser: req.user});
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Esta vivo ")
});

// process.env.PORT,process.env.IP