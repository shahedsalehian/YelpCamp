var mongoose = require("mongoose")
var Campground = require("./models/campground");
var Comment     = require("./models/comments");

var data = [
    {
        name: "Clouds Rest",
        image: "http://www.freeguidetonwcamping.com/Oregon_Washington_Main/Oregon/Northeast_OR/Indian_Lake_Campground_006.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum deleniti neque soluta quasi alias nesciunt quos consequuntur in repellendus, iste numquam consequatur architecto tenetur nobis laboriosam sint, delectus odio sed!"
    },
    {
        name: "Destiny Rest",
        image: "http://www.bobthecamper.com/images/Walk-In_Sites_Fairholme_Campground_Olympic_05.JPG",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum deleniti neque soluta quasi alias nesciunt quos consequuntur in repellendus, iste numquam consequatur architecto tenetur nobis laboriosam sint, delectus odio sed!"
    },
    {
        name: "EZ Rest",
        image: "http://www.grampiansparadise.com.au/jpg/home-gp/20131016-072--l3--wedding-guests-camping-on-lakeside-sites--at-grampians-paradise-camping-and-caravan-parkland--cropped-939px.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum deleniti neque soluta quasi alias nesciunt quos consequuntur in repellendus, iste numquam consequatur architecto tenetur nobis laboriosam sint, delectus odio sed!"
    },
    {
        name: "PZ Rest",
        image: "http://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=JyCkYWCo",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum deleniti neque soluta quasi alias nesciunt quos consequuntur in repellendus, iste numquam consequatur architecto tenetur nobis laboriosam sint, delectus odio sed!"
    }
]


function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);   
        // }
        // console.log("removed campgrounds");
        // //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("added a campground");
        //             //add a few comments
        //             Comment.create(
        //                 {
        //                 text: "This place is great, but I wish there was internet",
        //                 author: "Shahed Salehian"
        //                 }
        //             ,function(err,comment){
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created new comment");
        //                 }     
        //             });
        //         }
        //     });
        //});
    });
}


module.exports = seedDB;
