
var express = require("express");

var app = express();   // we executed and saved to the var app



//building routes down here


// "/" => "Hi there!"
app.get("/", function(req, res){ // "/" its okay for this to be without a named route.. because it is the home pag
    res.send("Hi there!"); 
});

// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
    res.send("Good bye");
});


// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    console.log("someone made a requet");
    res.send("MEOW");
});


app.get("/r/:subredditName", function(req, res) {   //adding  --> :routename   <-- will allow this space to be populated dynamically 
        console.log(req.params);
    res.send("Welcome to a subreddit");
});

// "/Sup" => "Sup"
app.get("/sup", function(req, res) {
    res.send("Sup");
});
  
  //adding more dynamic ability by adding more dynamic routs
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
      var subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
}); 

app.get("/dog", function(req, res){
    console.log("Someone made a request to /DOG!!!")
    res.send("MEOW!");
 
app.get("*", function(req, res) {  // the * reroutes when someone searches for unlisted route.. good for sending out error pages // this also over rides every other route.. so put this last
    res.send("you are a star!!!"); // this shows up on the page
});
//Tell Express to lsten for request( start server)

app.listen(process.env.PORT, process.env.IP, function(){  // enviroment variable  // tells express to listen on a particular port going through cloud 9 
        console.log("server has started");
}); 