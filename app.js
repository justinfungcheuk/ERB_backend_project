// create models folder
// create idea.js for
// step1: how to verify mongoose is working
// step2: go to mongo directory
// step3: mongo - that is the shell mongod is the execution
// step4: within the shell show dbs - list out all the database
// step5: use note-dev (if there is a db use the db file)
// step6: show collections (look a the schema)  
// step7: db.note-dev.find() - list out all the records within the db
// step8: db.note-dev.find().pretty() - format the record as Json format

// npm install express-handlebars --save

// we need to create the views folder for the handlebars files
// create index.handlebars
// within views create layouts create main.handlebars defaultlayout: "main"
// all the repeatable html structure will go to main, usually the DOC

import express from "express"; 
// express from "express";  - express.use() -> app.use() - 實際上 app 就是 express，只是改了名字
import { engine } from "express-handlebars";
// load mongose
import mongoose from "mongoose";
// load body-parser
import bodyParser from "body-parser"; // 將 object format，做一個 parsing
import morgan from "morgan";

const app = express(); // app 就是擁有 express 所有的 function

// create mongo connection /note-dev is the database name, it is a promise object so set the response and catch 
// database connection is done
mongoose
.connect("mongodb://localhost:27017/note-dev")
.then(() => console.log("Mongodb connected..")) // 因為不需要牽涉 this，所以可以直接寫 arrow function
.catch((err) => console.log(err));
//因為 database / response 什麼時候回來，我們不能控制，所以要用 promise object

// load Idea Model as constructor
import Idea from "./models/Idea.js";
//const Idea = mongoose.model("ideas");

//setup handlebars middleware
// copy 3 line from updated github
/**
 * ES6 handlebars 
 * 由於使用了 express-handlebars，所以需要使用 import 的方式引入模塊
 */
app.engine("handlebars", engine()); // 從 handlebars 該部份只抽取 engine function 這部分 
app.set("view engine", "handlebars"); // 因為要使用 template engine 它比較相似 react
// view engine 是 under handlebars
app.set("views", "./views"); // 將所有的 handlebars engine 放到 views 該部份的文件
app.use(morgan("tiny")); // morgan 中間件 的好處：可以幫助追蹤 app 的數據，運行時會展示出來關係 data 的 communication
// add methodoveride
// app.use(express.json());

// put body-parser middleware here
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());


// middleware setup, example from express middleware,
// everytime reload the route page, update time in termal
// instead of time, we can assign name value and pass to route, req is object that connect to all the other functions
/*
app.use(function (req, res, next) {
    //console.log("Time", Date.now());
    req.name = "Justin";
    next();
});
*/

//routes
// handle get request by .get()method
// adding index route to home /
// create a route, you need have request and respond objects that keepp all the properties of request / respond
// res.send()  - send the respond text to user browser
// passing the req.name into get, eeverytime reload the home route, the name is print under terminal
// purpose: that can create a log file within the server
// we can pass the value back to browser
// send the render page by changing sned function render function
app.get("/", (req, res) => {
    //console.log(req.name);
    const title = "Welcome";
    res.render("index", { title : title}); // index 的 handlebars
});

//create another route for about
// localhost:5000/about - will get the about text
app.get("/about", (req, res) => {
    res.render("about");  
});

// add note add routes
// idea from
app.get("/ideas/add", (req, res) => {
    res.render("ideas/add");
});

// step9: process idea from
app.post("/ideas", (req, res) => {
    // testing the route first
    res.send("ok")
    //testing the body-parser work for getting the content
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});

/**
 *  "type":"module",
 * 要於 package.json 加上 "type":"module", 是因為由之前的 require 轉為 ES6 的Syntax，
 * 所以要在 package.json 加上 "type":"module", 我們才可以使用 import 
 */