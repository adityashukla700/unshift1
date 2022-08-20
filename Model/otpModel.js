const {Schema,model}=require('mongoose')

module.exports.Otp=model('Otp',Schema({
   number:{
    type:String,
    required:true
   },
   otp:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now,
    index:{expires:300}
   },
   email:{
      type:String,
      // required:true,
  },
  password:{
      type:String,
      // required:true
  }

},{timestamps:true}))