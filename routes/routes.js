
//import express
const express=require('express')


//import controller function to resolve requests
const usercontroller=require('../controller/userController')
const prodController=require('../controller/prodController')
const cartController=require('../controller/cartController')
const orderController=require('../controller/orderController')


//multer import
const multerConfig=require('../middleware/userMiddleware')
const jwtMiddleware=require('../middleware/jwtMiddleware')
const multer = require('multer')

//create object for router class in express
const router=new express.Router()


//define various paths
router.post('/register',usercontroller.register)
router.get('/verify-email', usercontroller.verifyEmail);
router.post('/login',usercontroller.login)
router.get('/ulist',usercontroller.userslist)
router.put('/verfem',usercontroller.verifyUser)
router.put('/changep/:id',usercontroller.changepass)
router.get('/getusr/:id', usercontroller.getUser);
router.put('/editprof/:id',usercontroller.edituserp)

//product
router.post('/addp',jwtMiddleware,multerConfig.single('image'),prodController.addprod)
router.get('/getallp', prodController.allprod);
router.get('/getallpadm', prodController.allprodadm);
router.delete('/delprod/:id',jwtMiddleware,prodController.prodel)
router.put('/editp/:uid',jwtMiddleware,multerConfig.single('image'),prodController.editprod)
router.get('/getprod/:id',prodController.getProd)
router.get('/relprod/:id',prodController.relprod)
router.get('/latprod',prodController.latestp)
router.get('/bestsell',prodController.bestsellers)

//cart
router.post('/addcart',cartController.addtoCart)
router.get('/cartlist/:id',cartController.getcartlist)
 router.delete('/delcart/:id',cartController.deletecart)
 router.delete('/cartdel/:id',cartController.deleteallcart)
 router.get('/inccart/:id',cartController.incCartQuantity)
 router.get('/deccart/:id',cartController.decQuantity)

 //order
 router.post('/addorder',orderController.addOrders)
 router.get('/orderlist',orderController.orderList)





module.exports=router