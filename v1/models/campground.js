var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

//SCHEMA SETUP
var campgroundSchema = new Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//MODEL
module.exports = mongoose.model("Campground", campgroundSchema);

