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
    image: String
});


var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//      name: "Granite Hill", 
//       image: "https://cdn.pixabay.com/photo/2015/11/20/10/07/autumn-1052679__340.jpg"
        
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

// Delete this section

//  var campgrounds = [
//         {name: "Salmon creek", image: "https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg"},
//         {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2015/11/20/10/07/autumn-1052679__340.jpg"},
//         {name: "Mountain Goat", image: "https://cdn.pixabay.com/photo/2015/11/20/10/07/autumn-1052679__340.jpg"},
//         {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2015/11/20/10/07/autumn-1052679__340.jpg"},
//         {name: "Mountain Goat", image: "https://cdn.pixabay.com/photo/2015/11/20/10/07/autumn-1052679__340.jpg"},
//         {name: "salmon creek", image: "https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg"},
//         {name: "Mountain Goat", image: "https://cdn.pixabay.com/photo/2015/11/20/10/07/autumn-1052679__340.jpg"},
//         {name: "salmon creek", image: "https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg"}
//  ];


// delete above section


app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
        // get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds", {campgrounds:allCampgrounds});
            }
        });
        
     //   res.render("campgrounds", {campgrounds: campgrounds });
});





app.post("/campgrounds", function(req, res){ 
    // get data from form and add to campgrounds array
    var name = req.body.name;   // this will add in custom data sent in, and i turned into a variable so it can be used more than once.
    var image =  req.body.image; // this wil ladd in custom image sent in, and i turnedinto a variable so it can be used more than once
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
  res.redirect("/campgrounds");
});





app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the server has started");
});