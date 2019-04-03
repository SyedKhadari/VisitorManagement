var mongoose = require('mongoose')

var visitorSchema = mongoose.Schema({

    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true},
    personname:{type:String},
    relationship:{type:String},
    companyname:{type:String},
    gender:{type:String, required:true},
    purpose:{type:String, required:true},
    time_in_boolean:{type:Boolean,default:false},
    time_out_boolean:{type:Boolean,default:false},
    time_in:{type:Date,default:(new Date()).getTime()},
    time_out:{type:Date,default:(new Date()).getTime()}
})

module.exports = mongoose.model('visitor',visitorSchema)