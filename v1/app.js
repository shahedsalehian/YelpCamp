var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comments");


//APP CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
mongoose.connect("mongodb://localhost/campgrounds");
seedDB();

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
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//LANDING
app.get('/', function(req,res){
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

//CREATE
app.post("/campgrounds", isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
           console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW //has to be declared first
app.get("/campgrounds/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//NEW COMMENT
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    }) 
});

//CREATE
app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment); //we're pushing into the comments array of objects
                    campground.save(); //saves it to the DB
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});


//AUTH ROUTES

// show register form
app.get("/register", function(req,res){
    res.render("register");
});

// handles signup logic
app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

// show login form
app.get("/login", function(req,res){
    res.render("login");
});

//login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req,res){
});

//logout logic
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


app.listen("8010", function(){
    console.log("Server Started on Port 8010");
});