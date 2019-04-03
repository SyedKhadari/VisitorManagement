var mongoose = require('mongoose');

var employ_visitSchema = mongoose.Schema({
    emp_name:{type:String},
    time_in_boolean:{type:Boolean,default:false},
    time_out_boolean:{type:Boolean,default:false},
    time_in:{type:Date,default:(new Date()).getTime()},
    time_out:{type:Date,default:(new Date()).getTime()}
})

module.exports = mongoose.model('employ_visit',employ_visitSchema)