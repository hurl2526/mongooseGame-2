const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  name: {type:String, lowercase:true, required:true, unique:true},
  description:{type:String, required:true},
  released:{type:String},
  playtime:{type:Number},
  secret:{type:String, required:true},
  timestamp:{ type : Date, default: Date.now },
})

module.exports = mongoose.model('game', GameSchema)