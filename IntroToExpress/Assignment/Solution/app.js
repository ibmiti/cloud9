var express = require("express");
var app = express();


//these are my routes

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "barkety bark barketh!, yo yo wheres my Bitch at??",
        cat: "i hate you humans",
        goldfish: "......."
    }
    var animal = req.params.animal.toLowerCase(); // this allows the input to talk to the elements in attached to server and the .tolowercase() allows the to not worry about which case they input   
    var sound = sounds[animal]; // we provided the animals above, that will be slotted into this array            
    res.send("The " + animal + " says '" + sound + "'");
    
});

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times); // the Number allows for the message to be multiplied by whatever number entered into route. 
    var result = "";
    
    for(var i = 0; i < times; i++){
        result += message;  //allowing what ever number entered into result to multiple the message entered 
    }
    res.send(result); // you get one response back by using res.send("sadasd"); so we are adding result into a var and the adding the message to the result string and the making it multiply and the populate on the page by how many 'times' a person denotes
});

app.get("*", function(req, res){
    res.send("what r you doing with your life????");
});

//this is the listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Now serving your app");
});