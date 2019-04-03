var express = require('express')
var router = express.Router()
var Employ_visit = require("../model/employ_visit")
var face =  require("../face");
var NodeWebcam = require( "node-webcam" );
var opts = {
    callbackReturn:"location",
    quality: 1000,
    delay: 0
}

var Webcam = NodeWebcam.create( opts );
//var Webcam = NodeWebcam.create( opts );

router.get("/empl",function(req,res){
    res.send("working")
})

router.get("/employ_cam",function(req,res){
    res.render('projcam.ejs')
})

router.get("/employ_loader",function(req,res){
    res.render('loader.ejs')
})

//employee picture route
router.get("/employ_take_picture",function(req,res){
    NodeWebcam.capture( "test_picture", opts, function( err, data ) {
 
    });
    res.redirect("/employ/employ_in")

})

//employout picture
router.get("/employ_take_picture_out",function(req,res){
    NodeWebcam.capture("test_picture", opts, function(err,data){

    })
     res.redirect("/employ/employ_out")
})


//employee time in route
router.get("/employ_in",function(req,res){
var employ_face = face("./test_picture.jpg");
console.log(employ_face)
if(employ_face == "no faces"){

   res.redirect("/home1")
}
else{

    var name = employ_face.className;
var employ_visit  = new Employ_visit({
    emp_name:name.toString(),
    time_in_boolean:true
})
 employ_visit.save(function(err,result){
     if(err){
         console.log("Error")
     }
     else{
         res.redirect("/home")
         console.log(result)
     }
 })
}


});


router.get("/employ_out",function(req,res){
    var employ_face = face("./test_picture.jpg")
    console.log(employ_face)
    if(employ_face == "no faces"){
        res.redirect("/home1")
    }
    else{
    var name = employ_face.className;

    Employ_visit.findOneAndUpdate({"emp_name":name,"time_out_boolean":false},{$set:{"time_out_boolean":true,"time_out":new Date()}},function(err,result){
        if(err){
            console.log(err)
            res.send("Error")
        }
        else{
            console.log(result)
            res.redirect("/home")
        }
    })

    }
   

})

    

module.exports = router