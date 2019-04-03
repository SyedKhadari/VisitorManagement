var mongoose = require('mongoose')

var adminSchema = mongoose.Schema({
    adminname:{type:String},
    password:{type:String}
})

module.exports = mongoose.model('admin',adminSchema)