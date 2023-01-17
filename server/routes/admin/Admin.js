const express = require("express");
const router = express.Router();
const Adminctrl=require('../../controllers/Adminctrl')



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
router.post('/applyexpert',Adminctrl.applyexpert)
router.get('/experts',Adminctrl.getExpert)
router.post('/acceptExpert',Adminctrl.acceptExpert)
router.post('/blockExpert',Adminctrl.blockExpert)
router.post('/deletenews',Adminctrl.deletenews)




         

module.exports=router  