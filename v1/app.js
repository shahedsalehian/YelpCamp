var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost/campgrounds");

var campgroundSchema = new Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// var camp = new Campground({
//     name:"Granite Hill",
//     image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
// });

// camp.save(function(err, campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("campground saved");
//         console.log(campground);
//     }
// })

Campground.create({
    name:"Goat Mountain", 
    image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
}, function(err,campground){
    if(err){
        console.log(err);
    }else{
        console.log(campground)
    }
});

Campground.find({},function(err,campgrounds){
    if(err){
        console.log(err);
    }else{
        console.log(campgrounds)
    }
});


// var campgrounds = [
//     {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//     {name:"Granite Hill", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//     {name:"Goat Mountain", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//         {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//     {name:"Granite Hill", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//     {name:"Goat Mountain", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//         {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//     {name:"Granite Hill", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//     {name:"Goat Mountain", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
// ];


//INDEX
app.get('/', function(req,res){
    res.render("landing");
});

//SHOW
app.get("/campgrounds", function(req,res){

    res.render("campgrounds", {campgrounds: campgrounds})
});

//POST
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground); 
    res.redirect("/campgrounds");
});

//UPDATE
app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.listen("8010", function(){
    console.log("Server Started on Port 8010");
});