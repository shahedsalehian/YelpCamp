var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

//SCHEMA SETUP
var campgroundSchema = new Schema({
    name: String,
    image: String,
    description: String
});

//MODEL
module.exports = mongoose.model("Campground", campgroundSchema);

