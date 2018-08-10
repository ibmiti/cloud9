var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app"); // connecting this js file to the mongodb server

var catSchema = new mongoose.Schema({   // schema is the pattern, giving structure
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);  



//adding a new cat to the DB

//var Player_2 = new Cat({
//    name: "Player_2",
 //   age: 1,
  //  temperament: "Lazy_feisty"
//});

//var Player_2 = new Cat({
//    name: "meowth",
 //   age: 25,
  //  temperament: "lazy-fat"
//});

//var Player_2 = new Cat({
 //   name: "garfield",
  //  age: 20,
  //  temperament: "gluttonous"
// });

//Player_2.save(function(err, cat) {   // saving the newly created cat to the database
 //   if(err){
  //      console.log("SOMETHING WENT WRONG!")
//    } else {
 //       console.log("WE JUST SAVED A CAT TO THE DB:")
  //      console.log(cat);
//    }
// });

Cat.create({
 name: "Snow White",
 age: 15,
 temperament: "Sleeps"
},
 function(err, cat){
  if(err){
     console.log(err);
  } else {
     console.log(cat);
  }
});

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){   // we want all the cats not just one so we leave the {} object empty  
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err); // this print out the error code
    } else {
        console.log("ALL THE CATS.....")
        console.log(cats);
    }
});