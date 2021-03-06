var express = require("express");
var router = express.Router({
    mergeParams: true //merges params from all the defined models
});
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware");
var moment = require("moment");

//NEW COMMENT
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    }) 
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){;
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    req.flash("error", "Something went wrong!")
                    console.log(err);
                }else{
                    //add username and id to comments
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.time = moment().format("dddd, MMMM Do YYYY");
                    //save comment
                    comment.save();
                    campground.comments.push(comment); //we're pushing into the comments array of objects
                    campground.save(); //saves it to the DB
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
    });
    
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("back");
        }
    });
});

module.exports = router;