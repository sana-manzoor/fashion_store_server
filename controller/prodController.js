
const products = require('../model/prodSchema')

exports.addprod = async (req, res) => {
    console.log("Inside add product Function")
    console.log(req.file.filename)
    // console.log(req.file)
    const image=req.file.filename
    // console.log(u_image)
    // const u_image=req.body
    const {pid, title,description,price,size,number,category,subcategory,userId } = req.body
    console.log(`pid:${pid},description:${description},price:${price},size:${size},category:${category},subcategory:${subcategory},userId:${userId}`)
    try {
        const excistingUser = await products.findOne({ pid })
        console.log(excistingUser)
        if (excistingUser) {
            res.status(406).json("Excisting product..Please Try again!!")
        }
        else {
            const newUser = new products({pid,title,description,price,size: Array.isArray(size) ? size : [size],number,category,subcategory,image,userId})
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json("Something Went Wrong," + err)
        console.log(err)
    }

}



exports.allprod = async (req, res) => {
    console.log("Inside prodlist")
    const searchKey=req.query.search
    console.log(req.query)
    const query={
        title:{$regex:searchKey,$options:"i"}
    }

    // res.send("userslist")
    console.log(req.payload)
    try {
        // const data = await books.find(query)
        const data = await products.find(query)
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }

 exports.allprodadm = async (req, res) => {
    console.log("Inside prodlist of admindb")
 
    // res.send("userslist")
   
    try {
        // const data = await books.find(query)
        const data = await products.find()
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }

 
exports.prodel = async (req, res) => {
    console.log("Inside proddelete")
    // res.send("userslist")
    const {id}=req.params
    try {
        const data = await products.findByIdAndDelete({_id:id})
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }


 
 exports.editprod = async (req, res) => {
    const {pid,title, description,size,price,number,category,subcategory,userId}=req.body
    console.log(req.body)
    const uploadedFile=req.file?req.file.filename:req.body.image
    const {uid}=req.params
    try{
      console.log("inside edit")
      const result=await products.findOneAndUpdate({_id:uid},{pid,title, description,size,price,number,category,subcategory,image:uploadedFile,userId})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
        console.log(err)
      res.status(401).json(err)
    }
    //  res.send(`${title},${price},${uploadedFile},${id}`)
  }



  
 exports.getProd = async (req, res) => {
    // const userId=req.payload
    console.log("inside get produt")
   
    const {id}=req.params
    console.log(id)
    try{
      console.log("inside gett")
      const result=await products.findById({_id:id})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  //   res.send(`${title},${overview},${uploadedFile},${id}`)
  }


  
exports.relprod = async (req, res) => {
    console.log("Inside relprodlist")
    const {id}=req.params
    console.log(id)
    try {
        const data = await products.find({category:id}).limit(4)
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }



 exports.latestp = async (req, res) => {
    console.log("Inside prodlist");

    try {
        // Fetch random products using aggregation
        const data = await products.aggregate([
            { $sample: { size: 4 } } // Adjust the size to the number of random products you want
        ]);

        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
};

exports.bestsellers = async (req, res) => {
    console.log("Inside bestsellers");

    console.log(req.payload);
    try {
        // Fetch the last added product by sorting in descending order and limiting to 1
        const data = await products.find().sort({ _id: -1 }).limit(4);
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        res.status(401).json(err);
    }
};