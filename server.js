//jshint esversion:6
//boiler plate to call all the npm modules
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", 'ejs');

//connect to the mongodb server
mongoose.connect("mongodb://localhost:27017/userDB", {useUnifiedTopology: true, useNewUrlParser: true}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Successfully connected to database!');
    }
});



//create database
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password:{
        type: String,
        min: 8,
        max: 16,
        required: [true, "Please enter password"]
    }
});
const User =  new mongoose.model("User", userSchema);



app.get("/", function(req, res){
    res.render("form");
});
 
//insert data into the db 
app.post("/", function(req, res){
let fname = req.body.fname;
let lname = req.body.lname;
let email = req.body.email;
let pswrd = req.body.pswrd;

const user = new User({
    firstname: fname,
    lastname: lname,
    email: email,
    password: pswrd
});

user.save(function(err){
if(err){
    console.log("saved");
}else{
    console.log("uh, oh");
}
});
res.redirect("/");

});


app.listen(3000, function(){
    console.log("Server Running");
});