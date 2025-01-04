//import mongoose
const mongoose=require('mongoose')
const validators=require('validator')

//define schema
const productSchema=new mongoose.Schema({
    pid:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:[String],
        required:true,
       
    },
    number:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true,

    },
    subcategory:{
        type:String,
        required:true,
       
    },
    image: {
        type: String,
        required:true,
     
    },
    userId: {
        type: String, 
        required:true,
    }

   
})

const products=mongoose.model('products',productSchema)

module.exports=products