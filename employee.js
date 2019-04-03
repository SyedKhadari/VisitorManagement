var mongoose = require('mongoose')

var employeeSchema = mongoose.Schema({

    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    address:{type:String},
    phone:{type:Number},
    gender:{type:String},
    photo:{type:String}
})


module.exports = mongoose.model('employ',employeeSchema)