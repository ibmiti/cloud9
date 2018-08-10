var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name:  String
});

var User = mongoose.model("User", userSchema);

// Post - title, contect
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var postModel = mongoose.model("Post", postSchema);

var newUser = new User({
    email: "charlie@brown.edu",
    name: "charlie brown"
});

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});