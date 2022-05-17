// npm install express-handlebars --save

// we need to create the views folder for the handlebars files
// create index.handlebars
// within views create layouts create main.handlebars defaultlayout: "main"
// all the repeatable html structure will go to main, usually the DOC

import express from "express"; 
// express from "express";  - express.use() -> app.use() - 實際上 app 就是 express，只是改了名字
import { engine } from "express-handlebars";

const app = express(); // app 就是擁有 express 所有的 function

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
    res.render("index"); // index 的 handlebars
});

//create another route for about
// localhost:5000/about - will get the about text
app.get("/about", (req, res) => {
    res.render("about");  
});

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});

/**
 *  "type":"module",
 * 要於 package.json 加上 "type":"module", 是因為由之前的 require 轉為 ES6 的Syntax，
 * 所以要在 package.json 加上 "type":"module", 我們才可以使用 import 
 */