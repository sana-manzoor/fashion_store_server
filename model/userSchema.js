//import mongoose
const mongoose=require('mongoose')
const validators=require('validator')

//define schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validators.isEmail,'Invalid Email']
    },

    password:{
        type:String,
        required:true,

    },
    isAdmin:{
        default:false,
        type:Boolean
    },
    isVerified: {
        type: Boolean,
        default: false,  
    },
    verificationToken: {
        type: String, 
    },
    profile:{
        type:String
    }

   
})

const users=mongoose.model('users',userSchema)

module.exports=users