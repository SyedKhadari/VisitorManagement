var express = require("express")
var router = express.Router()

var Employee = require('./../model/employee')

var Admin = require('./../model/admin')

var Visitor = require('./../model/visitor')

var Timing = require('./../model/employ_visit')

const multer = require("multer")

const uploads = multer({dest: "./../images/employs"})

var NodeWebcam = require("node-webcam")

var opts = {
    callbackReturn:"location",
    quality: 1000,
    delay: 0
}

var Webcam = NodeWebcam.create( opts );


router.get("/admin_login_form",function(req,res){
    res.render("logid.ejs",{error:false})
})

router.get("/admin_page",function(req,res){
    res.render('ceo.ejs')
})

router.get("/add_employ",function(req,res){
    res.render('employ.ejs')
})

router.get("/admin_cam",function(req,res){
    res.render('projcam.ejs')
})

//employ timing
router.get("/employ_timing",function(req,res){

    Timing.find({},function(err,result){
        if(err){
            console.log(error)
        }
        else{
            res.render('employtiming.ejs',{employ_visits:result})
        }

    })
    
})



    //employee picture route
router.get("/picture",function(req,res){
    console.log("ok")
    
    

})




//for removing employ
router.get("/remove_employ",function(req,res){

    Employee.find({},function(err,result){

        if(err){
            console.log(err)
        }else{

            res.render('remove.ejs',{employs:result})
        }
    })
   
})

//for employ details
router.get("/employ_details",function(req,res){

    Employee.find({},function(err,result){

        if(err){
            console.log(err)
        }else{

            res.render('employdetails.ejs',{employs:result})
        }
    })

})


//for visitor details
router.get("/visitor_details",function(req,res){
    
    Visitor.find({},function(err,result){
        if(err){
            console.log(err)
        }
        else{
            res.render('visitordetails.ejs',{visitors:result})
        }
    })
})

//for adding employ
router.post('/add_employ',function(req,res){
    var photo_path = "./images/employs/"+req.body.firstname
    NodeWebcam.capture( photo_path, opts, function( err, data ) {
        console.log("no error")
      if(err){
          console.log("error")
      }else{

        var employee = new Employee({

            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            address:req.body.address,
            phone:req.body.phone,
            gender:req.body.gender,
            photo:photo_path
        
        })
    
        employee.save(function(err,result){
            if(err){
                console.log(error)
                res.redirect("/add_employ")
            }
            else{
                console.log(result)
                res.redirect("/admin/admin_cam")
            }
        })

        res.redirect("/admin/add_employ")
          
      }
    });
    
})

//for admin login details
router.post('/admin_login_form',function(req,res){
    
    var admin_name = req.body.adminname;
    var password = req.body.password;
    Admin.find({},function(err,result){

        var admin = result[0];
        if(admin.adminname == admin_name && admin.password == password){
            res.redirect("/admin/admin_page")
        }else{
            res.render("logid.ejs",{error:true})
        }
    })

})

//removing employ details
router.post("/remove_employ",function(req,res){
    console.log("removing....")
    console.log(req.body)
    var emp_id = req.body.emp_id;
    Employee.findByIdAndRemove(emp_id,function(err,result){
        if(err){
            console.log(err)
        }else{

            console.log(result)
            res.redirect("/admin/remove_employ")
        }
    })
})


module.exports = router