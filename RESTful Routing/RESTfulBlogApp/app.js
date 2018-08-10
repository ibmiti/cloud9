
var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();
    
// APP CONFIG    
mongoose.connect("mongodb://localhost/restful_blog_app");    // connecting app.js to app and local host
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));



// MONGOOSE/ MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body:  String,
    created: {type: Date, default: Date.now}  // if a user does not enter date. this inputs the dafault time.. you can also do this for image if a user does not select a image
});

var Blog = mongoose.model("Blog", blogSchema);
   
// Blog.create({
//     title: "to fly",
//     image: "https://cdn.pixabay.com/photo/2018/01/04/07/59/salt-3060093__340.jpgs",
//     body: "hello this is a blog post"     // this is how you would create a blog post on the back end
// });
    
// RESTFUL ROUTES

app.get("/", function(req, res) {  //route route, redirecting toward the blogs route
    res.redirect("blogs");
});


//INDEX ROUTE
app.get("/blogs", function(req, res){  // displaying all blogs with this route, and also adding an error check
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});



//CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body) //sanitizing the code that we allow the users to put in.. disallowing script tags
    console.log("===========")
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){ // check for errors when creating
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/blogs");
        }
    }); 
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   });
});



//EDIT ROUTE - editing existing blogs 
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog}); 
        }
    });
})

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
         req.body.blog.body = req.sanitize(req.body.blog.body) //sanitizing the code that we allow the users to put in.. disallowing script tags
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            //redirect somewhere
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
});


// listen respond to server start prompt
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started")
});
    
    