var express = require("express")
var app = express()

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/visitormg', {useNewUrlParser: true});
console.log("working")


var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())


var ejs = require('ejs')
app.set('view engine','ejs')

app.use(express.static("public"))

var admin_routes = require("./routes/admins")
app.use('/admin',admin_routes)

var visitor_routes = require('./routes/visitors')
app.use('/visitor',visitor_routes)

var employee_routes =require("./routes/employees")
app.use('/employ',employee_routes)


var port = 3100;

app.get("/home",function(req,res){
    res.render("my.ejs")
})

app.get('/',function(req,res){
    res.redirect("/home")
})

app.get('/home1',function(req,res){
    res.render("mydub.ejs")
})

app.listen(port, ()=>console.log("welcome to the port"))