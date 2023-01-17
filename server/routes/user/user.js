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
router.get("/news", Userctrl.news);
router.get('/experts',Userctrl.getexperts)
router.get('/vehicles',Userctrl.vehicles)
router.get('/brands',Userctrl.brands)
router.post('/payment/stripe',Userctrl.payment)


module.exports = router;
