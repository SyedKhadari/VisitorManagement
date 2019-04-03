var express = require("express")
var router = express.Router()

var Visitors = require('./../model/visitor')

router.get("/visitor_form",function(req,res){
    res.render("form.ejs")
})

router.get("/visitor_cam",function(req,res){
    res.render("projcam.ejs")
})

router.get("/visitor_out",function(req,res){

    Visitors.find({"time_out_boolean":false},function(err,result){
        if(err){
            console.log(err)
        }else{
            res.render("visitorout.ejs",{visitors:result})
        }
    })


    
})


// visitor details 
router.post('/visitor_form',function(req,res){

    var visitor = new Visitors({
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone,
         purpose:req.body.purpose,
         personname:req.body.personname,
         relationship:req.body.relationship,
         companyname:req.body.companyname,
         gender:req.body.gender,
         time_in_boolean:true,
         time_in:req.body.time_in
    })

    visitor.save(function(err,result){
        if(err){
            console.log('Error')
            res.redirect('/visitor/visitor_form')
        }
        else{
            console.log(result)
            res.redirect("/home")
           
        }
    })
}) 


router.post("/visitor_out/visitor",function(req,res){
  
    console.log(req.body)
    Visitors.findOneAndUpdate({"_id":req.body.emp_id},{$set:{"time_out_boolean":true,"time_out":new Date()}},function(err,result){
        if(err){
            console.log(err)
            res.send("something went wrong...")
        }else{
            console.log(result)
            res.send("ok")
        }
    })
})

module.exports = router