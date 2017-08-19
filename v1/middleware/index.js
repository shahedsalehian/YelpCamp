// all the middleware goes here
var Campground = require("../models/campground");
var Comments = require("../models/comments");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");//doesn't display anything yet, just passes on information to access after redirected
    res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        // find and update the correct comment
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                //foundComment.author.id is a mongoose object
                // req.user._id is a string so we can't compare them directly
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that.")
        res.redirect("back");
    }       
}

middlewareObj.checkCampgroundOwnership = function(req,res,next) {
    // all middleware setup as req,res,next
    // used for authorization 
    // authorization != authentication
    // authentication: are you this person?
    // authorization: is this person allowed to do this?

    if(req.isAuthenticated()){
        // find and update the correct campground
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground Not Found");
                res.redirect("back");
            }else{
                //foundCampground.author.id is a mongoose object
                // req.user._id is a string so we can't compare them directly
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }       
}


module.exports = middlewareObj;