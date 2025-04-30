const users=require('../model/userSchema')
const jwt=require('jsonwebtoken')
const transporter = require('../emailConfig');
const { prodel } = require('./prodController');


exports.register = async (req, res) => {
    console.log("Inside Register Function")
    const { name,address, email,password } = req.body
    console.log(`name:${name},address:${address},email:${email},password:${password}`)
    try {
        const excistingUser = await users.findOne({ email })
        console.log(excistingUser)
        if (excistingUser) {
            res.status(406).json("Excisting User..Please Try again!!")
        }
        else {
            const newUser = new users({name,address,email,password})
            await newUser.save()
            const token = jwt.sign({ userId: newUser._id }, process.env.secret_key, { expiresIn: '1h' });
            const verificationUrl = `https://fashion-store-server.onrender.com/verify-email?token=${token}`;
            await transporter.sendMail({
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Email Verification',
                html: `<p>Please click the following link to verify your email:</p>
                   <a href="${verificationUrl}">Verify Email</a>`
            });

            res.status(201).json({ message: 'Registration successful! Please check your email to verify.' });
          
        }
    }
    catch (err) {
        res.status(401).json("Something Went Wrong," + err)
        console.log(err)
    }

}



exports.login = async (req, res) => {
    console.log("inside login function!")
    const { email, password } = req.body
    console.log(`${email},${password}`)
    try {
        const excistingUser = await users.findOne({ email, password })
        if (excistingUser && excistingUser.isAdmin==true) {
         
            const token = jwt.sign({ userId: excistingUser._id }, "secretid")
            console.log(excistingUser)
            res.status(200).json({
                excistingUser,
                role: "admin",
                token
            })


        }
        else if(excistingUser && excistingUser.isVerified==true ){
            const token = jwt.sign({ userId: excistingUser._id }, "secretid")
            console.log(excistingUser)
            res.status(200).json({
                excistingUser,
                role: "user",
                token
            })
        }
        else if(excistingUser && excistingUser.isVerified==false){
            res.status(400).json("Email verification failed!!Verify Email First!!")
        }
       
        else {
            res.status(406).json("Invalid Email/Password!!")
        }
    }
    catch (err) {
        res.status(500).json("Something Went Wrong!!" + err)
    }
}


exports.getUser = async (req, res) => {
    // const userId=req.payload
    console.log("inside get student")
   
    const {id}=req.params
    try{
      console.log("inside gettuserr")
      const result=await users.findById({_id:id})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  //   res.send(`${title},${overview},${uploadedFile},${id}`)
  }


exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        console.log('Received token:', token);

        // Verify the token
        const decoded = jwt.verify(token, process.env.secret_key);
        console.log('Decoded token:', decoded);

        const userId = decoded.userId;

        // Update user's verification status
        const updatedUser = await users.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
        if (updatedUser) {
            console.log('User verification successful:', updatedUser);
            res.json({ message: 'Email verified successfully!' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};


exports.userslist = async (req, res) => {
    console.log("Inside users list")
    // res.send("userslist")
    console.log(req.payload)
    try {
        const data = await users.find({ isAdmin :false})
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }


 exports.edituserp = async (req, res) => {
    const {name,address,email,password }=req.body
    console.log(req.body)
    const profiles=req.file?req.file.filename:req.body.profile
    const {id}=req.params
    try{
      console.log("inside edit")
      const result=await users.findByIdAndUpdate({_id:id},{name,address,email,password,profile:profiles})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
        console.log(err)
      res.status(401).json(err)
    }
    //  res.send(`${title},${price},${uploadedFile},${id}`)
  }

exports.verifyUser=async(req,res)=>{
    console.log("inside verifyuser")
    const {name,email}=req.body
    console.log(`${name},${email}`)
    try{
            const result=await users.findOne({name,email})
            console.log(result)
            if(result){
            res.status(200).json(result)
            }
            else{
                res.status(400).json("invalid name/email")
            }
    }
    catch(err){
        res.staqtus(406).json("Something went wrong" +err)
    }
}



exports.changepass = async (req, res) => {
    // const userId=req.payload
    console.log("inside changepassword")
    const {id}=req.params
   
    const {password}=req.body
    try{
      const result=await users.findOneAndUpdate({_id:id},{password})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  //   res.send(`${title},${overview},${uploadedFile},${id}`)
  }