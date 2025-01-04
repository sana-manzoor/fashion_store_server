const orders=require('../model/orderSchema')

exports.addOrders=async(req,res)=>{
    console.log("Inside addorders Function!!")
  
    const {id,uname,uid,amount,status}=req.body
    console.log(`${id},${uname},${uid},${amount},${status}`)
    try{
        const excistingOrder=await orders.findOne({id})
        if(excistingOrder){
            res.status(406).json("Excisting order")
        }
        else{
            const newOrder=new orders({id,uname,uid,amount,status})
            await newOrder.save()
            res.status(200).json(newOrder)
        }
    }
    catch(err){
        res.status(401).json("Something Went Wrong!! " + err)
    }
}



exports.orderList = async (req, res) => {
    console.log("Inside orderlist")
    // res.send("userslist")
    console.log(req.payload)
    try {
        const data = await orders.find()
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }

