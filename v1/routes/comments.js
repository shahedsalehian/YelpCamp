var express = require("express");
var router = express.Router({
    mergeParams: true //merges params from all the defined models
});
var Campground = require("../models/campground");
var Comment = require("../models/comments");

//NEW COMMENT
router.get("/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    }) 
});

//CREATE
router.post("/", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comments
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment); //we're pushing into the comments array of objects
                    campground.save(); //saves it to the DB
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;