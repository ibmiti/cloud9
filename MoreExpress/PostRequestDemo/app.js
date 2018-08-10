var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); 



app.set("view engine", "ejs");


var friends = ["Tony", "miranda", "Justin", "Pierre", "Lilly"];



// Start of Routes 

app.get("/", function(req, res){
    res.render("home");
});


app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfreind;
    friends.push(newFriend);
    res.redirect("/friends");  // sends you back to the friends route after adding new friend.
}); 


app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});









// server listening
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});

