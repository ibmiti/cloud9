var express = require("express");
var app = express();




app.use(express.static("public"));
app.set("view engine", "ejs");  // this will make it so you dont have to use .ejs in file names when linking or rendering.



// home route
 app.get("/", function(req, res){
     res.render("home");  // ejs stands for embedded javascript..
    
 });


app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;  // so for this whenever someone enters in something for thing in the route it will get sent down to the render and into the thingvar and then rendered onthe page 
    res.render("love", {thingVar: thing});  // what ever i want on my template ca, go within this render command
});



app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My Adorable pet bunny", author: "Nigel"},
        {title: "Can you be lieve this pomsky?", author: "Kierre"}
        ]
        res.render("posts.ejs", {posts: posts});
})
        
     
     
//wrong page route
app.get("*", function(req, res){
    res.send("whats wrong with your life lol.. this isnt even a page dude");
});




// event listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});