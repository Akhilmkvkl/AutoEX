const express = require("express");
const router = express.Router();
const Adminctrl=require('../../controllers/Adminctrl')



router.post('/login',Adminctrl.login)
router.get('/users',Adminctrl.users)
router.post('/users/blockuser',Adminctrl.blockuser)
router.post('/users/unblockuser',Adminctrl.unblockuser)





module.exports=router  