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
const Expert = require("../modals/Experts_modal");
const jimp = require('jimp');
const Buffer = require("buffer/").Buffer;
const cloudinary =require('cloudinary')
;

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

      res.json({ msg: "Login Success",admin });
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
      const resp = await Users.findOneAndUpdate(
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

      const resp = await Users.findOneAndUpdate(
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
      const data = req.body.values
      const images = req.body.imagedata
       
        const datenow = new Date();
        const Dateposted = datenow.toDateString();
        

        const newsdetails = new News({
          title: data.title,
          news: data.news,
          images: images,
          date: Dateposted,
          list:true
        });
        newsdetails.save().then(() => {
          res.json({ msg: "added successfully" });
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
  deletenews: async (req, res) => {
    try {
      const id = req.body.id;
      const dnews = await News.deleteOne({ _id: ObjectId(id) });
      res.json({ msg: "success" });
    } catch (error) {}
  },
  listnews: async (req,res)=>{
    try {
      const id=req.body.id
       News.updateOne({_id:id},{$set:{list:true}})
       .then(()=>{
        res.json({msg:"success"})
       })
    } catch (error) {
      
    }
  }, 
  unlistnews: async (req,res)=>{
    try {
      const id=req.body.id
       News.updateOne({_id:id},{$set:{list:false}})
       .then(()=>{
        res.json({msg:"success"})
       })
    } catch (error) {
      
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
        blocked:false,
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
      const images =  req.body.imagedata

     
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
          price:data.price,
          Images: images,
        });
        vehicledetails.save().then(() => {
          res.json({ msg: "vehicle added successfully" });
        });
      
    } catch (error) {
      console.log(error);
      res.json({ error: "an error occured" });
    }
  },
  vehicles: async (req, res) => {
    try {
      const veh = await vehicle.find();
      console.log(veh);
      if (veh) {
        res.json({ msg: "success", veh });
      }
    } catch (error) {
      res.json({ error: "can't fetch data" });
      console.log(error);
    }
  },
  brands: async (req, res) => {
    try {
      const brands = await Brand.find();
      if (brands) {
        res.json({ msg: "success", brands });
      }
    } catch (error) {
      console.log(error);
      res.json({ error: "can't fetch details" });
    }
  },
  blockbrand:async (req,res)=>{
     try {
      const id=req.body.id
      Brand.updateOne({_id:id},{$set:{blocked:true}})
      .then(()=>{
        res.json({msg:"success"})
      })
     } catch (error) {
       console.log(error);
     }
  },
  unblockbrand:async (req,res)=>{
    try {
     const id=req.body.id
     Brand.updateOne({_id:id},{$set:{blocked:false}})
     .then(()=>{
       res.json({msg:"success"})
     })
    } catch (error) {
      console.log(error);
    }
 },
  addCommunity: async (req, res) => {
    try {
      console.log(req.body);
      const data = req.body.values;
      const communitydata = new Community({
        name: data.name,
        link: data.link,
        platform: data.platform,
        decription: data.description,
        blocked:false
      });
      communitydata.save().then(() => {
        res.json({ msg: "success" });
      });
    } catch (error) {
      console.log(error);
      res.json({ error: "faild to fetch" });
    }
  },
  getcommunity: async (req, res) => {
    try {
      const community = await Community.find();
      if (community) {
        res.json({ msg: "success", community });
      }
    } catch (error) {
      res.json({ error: "error" });
      console.log(error);
    }
  },
  blockcommunity:async (req,res)=>{
      try {
        const id=req.body.id
         Community.updateOne({_id:id},{$set:{blocked:true}})
         .then(()=>{
          res.json({msg:"success"})
         })
      } catch (error) {
        
      }
  },
  unblockcommunity:async (req,res)=>{
    try {
      const id=req.body.id
       Community.updateOne({_id:id},{$set:{blocked:false}})
       .then(()=>{
        res.json({msg:"success"})
       })
    } catch (error) {
      
    }
},

  applyexpert: async (req, res) => {
    {
      try {
        console.log(req.body)
        const data = req.body[0];

        const userdata = data[1];
        const applicationdata = data[0];
        console.log(applicationdata)

        const avatarimg = applicationdata.Avatar.fileList;
        const applicationimg = applicationdata.Documents.fileList;

        console.log(avatarimg);
        const avatarimages = [];
        const docimages = [];
        const bar = new Promise((resolve, reject) => {
          avatarimg.forEach(async (image, index, array) => {
            console.log(image);
            const datas = await uploadToCloudinary(image.thumbUrl, "profile");

            

            avatarimages.push(datas.url);

            if (index === array.length - 1) resolve();
          });
        });
        bar.then(() => {
          const doc = new Promise((resolve, reject) => {
            applicationimg.forEach(async (image, index, array) => {
              console.log(image);
              const datas = await uploadToCloudinary(
                image.thumbUrl,
                "Documents"
              );

              console.log(datas.url);

              docimages.push(datas.url);

              if (index === array.length - 1) resolve();
            });
          });
          doc.then(() => {
            const applydetails = new Expert({
              ExpertId: userdata._id,
              Expertname: userdata.name,
              Rate: applicationdata.Rate,
              phone: applicationdata.Phone,
              about: applicationdata.about,
              status: "applied",
              Document: docimages,
              profile: avatarimages,
            

              
            });
            applydetails.save().then(() => {
              res.json({ msg: "success" });
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  getExpert: async (req, res) => {
    try {
      const experts = await Expert.find();
      if (experts) {
        res.json({ msg: "success", experts });
      }
    } catch (error) {
      console.log(error);
      res.json({ error: "can't fetch data" });
    }
  },
  acceptExpert: async (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.id;
      Expert.updateOne(
        { _id: ObjectId(id) },
        { $set: { status: "approved" } }
      ).then(async () => {
        const response = await Expert.findOne({ _id: ObjectId(id) });
        if (response) {
          console.log(response);
          Users.updateOne(
            { _id: ObjectId(response.ExpertId) },
            { $set: { isExpert: "yes" } }
          )
          .then(()=>{
            res.json({ msg: "Expert approved" });
          }).catch((error)=>{
            console.log(error)
          })
          
        }
      });
    } catch (error) {
      res.json({ error: "an error occured" });
      console.log(error);
    }
  },
  blockExpert: async (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.id;
      Expert.updateOne(
        { _id: ObjectId(id) },
        { $set: { status: "blocked" } }
      ).then((data) => {
        console.log(data)
        Users.updateOne(
          { _id: ObjectId(id) },
          { $set: { isExpert: "no" } }
        )
        .then(()=>{
        res.json({ msg: "Expert Blocked" });
             
        })
      });
    } catch (error) {
      res.json({ error: "an error occured" });
      console.log(error);
    }
  },
  deletecar:async (req,res)=>{
    try {
      const id=req.body.id

      vehicle.deleteOne({_id:ObjectId(id)})
      .then(()=>{
        res.json({msg:"vehicle deleted successfully"})
      })
    } catch (error) {
      
      console.log(error)
      res.json({error})
    }
  },
  deletecommunity: async (req,res)=>{
    try {
       const id =req.body.id
       Community.deleteOne({_id:ObjectId(id)})
       .then(()=>{
        res.json({msg:"successfully removed community"})
       })
    } catch (error) {
      res.json({error})
    }
  }
};

module.exports = Adminctrl;
