const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

const Taskitems = ["Go Jogging","Take bath","Eat Food"];
const workItems = [];

app.get("/",function(req,res){
  const day = date.getDate(); //getDay
  res.render("list", {listTitle: day, ItemLists: Taskitems});
});

app.post("/", function(req,res){
  console.log(req.body);
  const item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    Taskitems.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list",{listTitle: "Work List", ItemLists: workItems});
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000,function(){
  console.log("server started at port 3000");
});
