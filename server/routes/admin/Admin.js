const express = require("express");
const router = express.Router();
const Adminctrl=require('../../controllers/Adminctrl')
const Auth = require("../../middlewares/Auth");


router.post('/login',Adminctrl.login)
router.get('/users',Adminctrl.users)
router.post('/users/blockuser',Adminctrl.blockuser)
router.post('/users/unblockuser',Adminctrl.unblockuser) 
router.post('/addnews',Adminctrl.addNews)
router.get('/news',Adminctrl.news)
router.post('/addbrands',Adminctrl.addBrand)
router.post('/addvehicle',Adminctrl.addvehicle)
router.get('/vehicle',Adminctrl.vehicles)
router.get('/brands',Adminctrl.brands)
router.post('/addCommunity',Adminctrl.addCommunity)
router.get('/community',Adminctrl.getcommunity)
router.post('/applyexpert',Auth,Adminctrl.applyexpert)
router.get('/experts',Adminctrl.getExpert)
router.post('/acceptExpert',Adminctrl.acceptExpert)
router.post('/blockExpert',Adminctrl.blockExpert)
router.post('/deletenews',Adminctrl.deletenews)
router.post('/deletecar',Adminctrl.deletecar)
router.post('/deletecomm',Adminctrl.deletecommunity)
router.post('/blockbrand',Adminctrl.blockbrand)
router.post('/unblockbrand',Adminctrl.unblockbrand)
router.post('/blockcommunity',Adminctrl.blockcommunity)
router.post('/unblockcommunity',Adminctrl.unblockcommunity)
router.post('/listnews',Adminctrl.listnews)
router.post('/unlistnews',Adminctrl.unlistnews)












         

module.exports=router  