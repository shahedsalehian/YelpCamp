var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//INDEX
router.get("/", function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

//CREATE
router.post("/", isLoggedIn, function(req,res){
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
router.get("/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


//exporting all the routes
module.exports = router;