const carts=require('../model/cartSchema')

exports.addtoCart=async(req,res)=>{
    console.log("insdide cart")
    const {pid,title,quantity,price,size,image,uid}=req.body
    console.log(req.body)
    
    try{
        const excistingProduct=await carts.findOne({pid,uid})
        if(excistingProduct){
            res.status(406).json("Product already excists in cart")
        }
        else{
            const newItem=new carts({pid,title,price,size,image,uid,quantity:"1",total:""})
            await newItem.save()
            res.status(200).json(newItem)
        }
    }
    catch(err){
        res.status(404).json("something went wrong" +err)
    }

    
}


exports.getcartlist = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        console.log("inside view cart")
        const result = await carts.find({ uid: id })
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

exports.deleteallcart=async(req,res)=>{
    console.log("Inside allcartdelete")
    // res.send("userslist")
    const {id}=req.params
    try {
        const data = await carts.deleteMany({uid:id})
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
}


exports.deletecart= async (req, res) => {
    console.log("Inside cartdelete")
    // res.send("userslist")
    const {id}=req.params
    try {
        const data = await carts.findByIdAndDelete({_id:id})
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }


 exports.incCartQuantity=async(req,res)=>{
    // const {quantity}=req.body
    // console.log(quantity)
    console.log("Inside cartincrease")
    try{
        const {id}=req.params
        console.log(id)
        const excistingProduct=await carts.findOne({_id: id})
        console.log(excistingProduct)
        excistingProduct.quantity++
        excistingProduct.total=excistingProduct.price * excistingProduct.quantity
        await excistingProduct.save()
        res.status(200).json(excistingProduct)
    }
    catch(err){
        res.status(401).json(err)
    }
}



exports.decQuantity=async(req,res)=>{
    console.log("Inside cart decrease")
    try{
        const {id}=req.params
        const excistingProduct=await carts.findOne({_id: id})
        excistingProduct.quantity--
        if(excistingProduct.quantity==0){
            const result=await carts.findOneAndDelete({_id:id})
            res.status(200).json("Item Deleted by Quantity 0")
        }
        else{
            excistingProduct.total=excistingProduct.price * excistingProduct.quantity
            await excistingProduct.save()
            res.status(200).json(excistingProduct)
        }

    }
    catch(err){
        res.status(401).json(err)
    }
}


