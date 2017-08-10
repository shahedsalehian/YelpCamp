var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var Campground      = require("./models/campground");
var seedDB         = require("./seeds");

seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/campgrounds");


// Campground.create({
//     name:"Goat Mountain", 
//     image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
//     description: "asdfasdfasdfasdfasdf"
// }, function(err,campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(campground)
//     }
// });

// Campground.find({},function(err,campgrounds){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(campgrounds)
//     }
// });


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
            res.render("index", {campgrounds: campgrounds});
        }
    })
});

//CREATE
app.post("/campgrounds", function(req,res){
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
app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

//SHOW
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen("8010", function(){
    console.log("Server Started on Port 8010");
});