var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp"); // connecting this page to mongo server
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");


// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


var Campground = mongoose.model("Campground", campgroundSchema);


// an example of creating a entry with error checking from the server side. 
// Campground.create(
//     {
//      name: "Granite Hill", 
//      image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",
//      description: "This is a huge granite hill, no bathrooms. no water. beautiful granite" 
        
//     }, 
//     function(err, campground){
//             if(err){
//                 console.log("ERROR CAMPING!");
//                 console.log(err);
//             } else {
//                 console.log("NEWLY CREATED CAMPGROUND:  ")
//                 console.log(campground)
//             }

// });
// Campground.create(
//     {
//      name: "Salmon Creek", 
//      image: "https://cdn.pixabay.com/photo/2015/08/19/16/00/campfire-896196__340.jpg",
//      description: "This is a huge granite hill, no bathrooms. no water. beautiful granite" 
        
//     }, 
//     function(err, campground){
//             if(err){
//                 console.log("ERROR CAMPING!");
//                 console.log(err);
//             } else {
//                 console.log("NEWLY CREATED CAMPGROUND:  ")
//                 console.log(campground)
//             }

// });

//INDEX ROUTE - SHOW ALL CAMPGROUNDS
app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
        // get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("index", {campgrounds:allCampgrounds});
            }
        });
});




//CREATE ROUTE - ADD NEW CAMPGROUNDS TO DATABASE
app.post("/campgrounds", function(req, res){ 
    // get data from form and add to campgrounds array
    var name = req.body.name;   // this will add in custom data sent in, and i turned into a variable so it can be used more than once.
    var image =  req.body.image; // this wil ladd in custom image sent in, and i turnedinto a variable so it can be used more than once
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
   // create new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
             //redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
   });
});




//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});




//SHOW - shows more info about one campground

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){  // the required params for finding this campground is the id 
        if(err){
            console.log(err);
        } else {
               //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})


//LISTENS FOR SERVER START, AND RESPONDS WITH A MESSAGE
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the server has started");
});