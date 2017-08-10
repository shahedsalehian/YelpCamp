var mongoose = require("mongoose")
var Campground = require("./models/campground");
var Comment     = require("./models/comments");

var data = [
    {
        name: "Clouds Rest",
        image: "https://i.imgur.com/WkNL8jj.png",
        description: "This is Destiny"
    },
    {
        name: "Destiny Rest",
        image: "https://blogs-images.forbes.com/johngaudiosi/files/2011/09/destiny-starcraft-235x300.jpg?width=960",
        description: "This is Destiny"
    },
    {
        name: "EZ Rest",
        image: "https://i.ytimg.com/vi/tipczD5qk6w/maxresdefault.jpg",
        description: "This is Destiny"
    }
]


function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);   
        }
        console.log("removed campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    //add a few comments
                    Comment.create(
                        {
                        text: "This place is great, but I wish there was internet",
                        author: "Shahed Salehian"
                        }
                    ,function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }     
                    });
                }
            });
        });
    });
}


module.exports = seedDB;
