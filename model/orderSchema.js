const mongoose = require('mongoose')
const validators = require('validator')

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    uname:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    amount: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required:true

    }
})

const orders = mongoose.model('orders', orderSchema)
module.exports = orders