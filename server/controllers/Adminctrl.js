const Admin = require("../modals/Admin_modal");
const bycrypt = require("bcrypt");
const Users = require("../modals/user_model");
const { ObjectId } = require("mongodb");
const { response } = require("../app");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../config/Cloudinary");
const DatauriParser = require("datauri/parser");
const News = require("../modals/News_modal");
const Brand = require("../modals/Brand_modal");
const vehicle = require("../modals/Vehicle_modal");
const Community = require("../modals/Community_modal");
const parser = new DatauriParser();

const Adminctrl = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body, "this is from body");
      if (!email || !password)
        return res.status(400).json({ msg: "All field required" });

      const admin = await Admin.findOne({ email: email });
      console.log(admin);
      if (!admin)
        return res.status(400).json({ msg: "This email is not registered" });

      const isMatch = await bycrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });

      res.json({ msg: "Login Success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },

  users: async (req, res) => {
    try {
      const userdata = await Users.find();
      res.json({ users: userdata });
    } catch (error) {
      res.json({ err: error });
    }
  },
  blockuser: async (req, res) => {
    try {
      const userid = req.body.id;
      console.log(userid);
      const res = await Users.findOneAndUpdate(
        { _id: ObjectId(userid) },
        { status: "blocked" }
      );
      res.json({ msg: "User  blocked successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "an error occured" });
    }
  },
  unblockuser: async (req, res) => {
    try {
      const userid = req.body.id;

      const res = await Users.findOneAndUpdate(
        { _id: ObjectId(userid) },
        { status: "registered" }
      );
      res.json({ msg: "user unblocked successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "an error occured" });
    }
  },

  addNews: async (req, res) => {
    try {
      const data = req.body.values;
      const images = data.image.fileList;

      // console.log(images)
      const dataimages = [];
      const bar = new Promise((resolve, reject) => {
        images.forEach(async (image, index, array) => {
          console.log(image);
          const datas = await uploadToCloudinary(image.thumbUrl, "news-images");

          console.log(datas.url);

          dataimages.push(datas.url);

          if (index === array.length - 1) resolve();
        });
      });
      bar.then(() => {
        const datenow = new Date();
        const Dateposted = datenow.toDateString();
        console.log(dataimages, "this is data");

        const newsdetails = new News({
          title: data.title,
          news: data.news,
          images: dataimages,
          date: Dateposted,
        });
        newsdetails.save().then(() => {
          res.json({ msg: "added successfully" });
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  news: async (req, res) => {
    try {
      const news = await News.find();
      res.json({ msg: "success", news });
    } catch (error) {
      res.json({ error });
    }
  },
  addBrand: async (req, res) => {
    try {
      // console.log(req.body.values)
      const data = req.body.values;
      const brandicon = data.icon.file;
      console.log(brandicon);
      const resp = await uploadToCloudinary(brandicon.thumbUrl, "Brands");
      console.log(resp);
      const Branddetails = new Brand({
        Brandname: data.Brandname,
        icon: resp.url,
      });
      Branddetails.save().then(() => {
        res.json({ msg: "successfully added" });
      });
    } catch (error) {
      console.log(error);
    }
  },
  addvehicle: async (req, res) => {
    try {
      console.log(req.body.values);
      const data = req.body.values;
      const images = data.image.fileList;

      // console.log(images)
      const dataimages = [];
      const bar = new Promise((resolve, reject) => {
        images.forEach(async (image, index, array) => {
          console.log(image);
          const datas = await uploadToCloudinary(image.thumbUrl, "Vehicles");

          console.log(datas.url);

          dataimages.push(datas.url);

          if (index === array.length - 1) resolve();
        });
      });
      bar.then(() => {
        const vehicledetails = new vehicle({
          Name: data.Name,
          Brand: data.Brand,
          Cylinders: data.Cylinders,
          Engine: data.Engine,
          Type: data.Type,
          Description: data.description,
          Video: data.video,
          Fueltype: data.Fueltype,
          power: data.Power,
          Torque: data.Torque,
          Seats: data.Seats,
          Mileage: data.Mileage,
          Images: dataimages,
        });
        vehicledetails.save().then(() => {
          res.json({ msg: "vehicle added successfully" });
        });
      });
    } catch (error) {
      console.log(error);
      res.json({ error: "an error occured" });
    }
  },
  vehicles:async(req,res)=>{
    try {
     const veh= await vehicle.find()
     console.log(veh)
     if(veh){
      res.json({msg:"success",veh})
     }
    } catch (error) {
      res.json({error:"can't fetch data"})
      console.log(error)
    }
  },
  brands:async (req,res)=>{
    try {
      const brands=await Brand.find()
      if (brands){
        res.json({msg:"success",brands})
      }
    } catch (error) {
      console.log(error)
      res.json({error:"can't fetch details"})
    }
  },
  addCommunity:async(req,res)=>{
    try {
      console.log(req.body)
      const data=req.body.values
      const communitydata=new Community({
        name:data.name,
        link:data.link,
        platform:data.platform,
        decription:data.description
      })
      communitydata.save()
      .then(()=>{
        res.json({msg:"success"})
      })
    } catch (error) {
      console.log(error)
      res.json({error:"faild to fetch"})
    }
  },
  getcommunity:async(req,res)=>{
   try {
    const community= await Community.find()
    if(community){
      res.json({msg:"success",community})
    }
   } catch (error) {
    res.json({error:"error"})
    console.log(error)
   }
  },
};

module.exports = Adminctrl;
