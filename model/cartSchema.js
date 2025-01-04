//import mongoose
const mongoose=require('mongoose')
const validators=require('validator')

//define schema
const cartSchema=new mongoose.Schema({
    pid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true,
       
    },
    image: {
        type: String,
        required:true,
     
    },
    uid: {
        type: String, 
        required:true,
    },
   
    total:{
        type:Number,
       
    }


   
})

const carts=mongoose.model('carts',cartSchema)

module.exports=carts