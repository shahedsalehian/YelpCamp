var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var commentSchema = new Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // the model that we are going to refer to
        },
        username: String
    },
    time: String
});

module.exports = mongoose.model("Comment", commentSchema);