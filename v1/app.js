var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comments");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");


//setting the promise to make error warning in CLI to go away
mongoose.Promise = global.Promise;

//APP CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/campgrounds",{useMongoClient: true}); // using {useMongoClient: true} to make Mongoose error warning in CLI go away
app.use(methodOverride("_method"));
app.use(flash());
//
//seedDB();
//


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "QEWRTY IS SUPERIOR",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this function is passed onto every route so we can access the user from all templates
//so we can access the "currentUser" from all templates
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error   = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//these .use appends the prefixes in the strings to the route urls in the route files
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen("8010", function(){
    console.log("Server Started on Port 8010");
});