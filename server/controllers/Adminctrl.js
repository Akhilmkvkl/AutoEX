const Admin = require('../modals/Admin_modal')
const bycrypt=require('bcrypt')
const Users=require('../modals/user_model')
const {ObjectId} = require('mongodb');
const { response } = require('../app');

const Adminctrl = {

  login: async (req, res) => {

    try {
      const { email, password } = req.body;
      console.log(req.body,"this is from body");
      if (!email || !password)
        return res.status(400).json({ msg: "All field required" });

      const admin = await Admin.findOne({ email:email});
      console.log(admin)
      if (!admin)
        return res.status(400).json({ msg: "This email is not registered" });
     
      const isMatch = await bycrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });

      res.json({ msg: "Login Success" });
    } catch(error) {
        console.log(error)
      return res.status(500).json({ msg: error.message });
    }
  },

  users: async (req,res)=>{
    try {
      const userdata= await Users.find()
      res.json({users:userdata})
    } catch (error) {
      res.json({err:error})
    }
  },
  blockuser: async (req,res)=>{
    try {
      const userid=req.body.id
      console.log(userid)
      const res= await Users.findOneAndUpdate({_id:ObjectId(userid)},{status:"blocked"})
     return res.json({msg:"User  blocked successfully"})

    } catch (error) {
      console.log(error)
      res.status(400).json({msg:"an error occured"})
    }
  },
  unblockuser:async (req,res)=>{
    try {
      const userid=req.body.id

      const res= await Users.findOneAndUpdate({_id:ObjectId(userid)},{status:"registered"})
      res.json({msg:"user unblocked successfully"})

    } catch (error) {
      console.log(error)
      res.status(400).json({msg:"an error occured"})
    }
  },
  
  

};

module.exports = Adminctrl;
