var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


var campgrounds = [
    {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name:"Granite Hill", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name:"Goat Mountain", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name:"Granite Hill", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name:"Goat Mountain", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name:"Granite Hill", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name:"Goat Mountain", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
];


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