const express = require("express");
const router = express.Router();
const Userctrl = require("../../controllers/Userctrl");
const Auth = require("../../middlewares/Auth");

router.post("/register", Userctrl.register);
router.post("/activation", Userctrl.activateMail);
router.post("/login", Userctrl.login);
router.post("/refresh_Token", Userctrl.getaccessToken);
router.post("/forgotpassword", Userctrl.forgotPassword);
router.post("/resetPassword", Auth, Userctrl.resetPassword);
router.get("/news",Userctrl.news);
router.get('/experts',Userctrl.getexperts)
router.get('/vehicles',Userctrl.vehicles)
router.get('/brands',Userctrl.brands)
router.post('/payment/stripe',Auth,Userctrl.payment)
router.post('/postreview',Auth,Userctrl.postReview)
router.post('/reviews',Userctrl.review)
router.get('/communities',Userctrl.community)
router.post('/paymentsucces',Auth,Userctrl.paymentsuccess)
router.post('/sessions',Auth,Userctrl.sessions)
router.post('/chatmessage',Auth,Userctrl.chatmessage)
router.post('/newmessage',Auth,Userctrl.newmessage)
router.post('/addAvailability',Auth,Userctrl.addAvailability)
router.post('/getDate',Userctrl.getdates)
router.post('/removeDate',Userctrl.removeAvilable) 










module.exports = router;
 