// to get env file while server is running,import dotenv
require('dotenv').config()

//import express.js
const express=require('express')

const Stripe=require('stripe')

//import cors
const cors=require('cors')

//create express server
const server1=express()

//implementing cors to server
server1.use(cors())

//parsing json data using server app
server1.use(express.json())

//import router
const router=require('./routes/routes')


//import connection.js
require('./connection/dbconnection')

//import middleware
// const middleware=require('./middlewares/umiddleware')
// server1.use(middleware)

//use router to server
server1.use(router)

const stripe = require('stripe')('sk_test_51PjcIrGvWCRuSvdqYZTLLmLL6Gta1Tcs2c2GCS2L0tCfLIkp51QQPVwjeWhdJtFxNth1wM0cXb0cryM9kqJUOV9I00f2ljjFxG'); // Replace with your Stripe secret key


// port numver configuration
const PORT=4000 || process.env.PORT

//serving upload files
server1.use('/upload',express.static('./uploads'))


//to run server
server1.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}`)
})

//resolve request to localhost:400
server1.get('/',(req,res)=>{
    res.send("<h1>Server is running successfully</h1>")
})

server1.post('/',(req,res)=>{
    res.send("<h1>Post Request Is successful</h1>")
})



server1.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    console.log(amount)
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd', // Use your currency here
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: 'Failed to create payment intent' });
    }
  });
  
