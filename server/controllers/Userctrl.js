const Users = require("../modals/user_model");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./Sendmail");
const News = require("../modals/News_modal");
const Expert = require("../modals/Experts_modal");
const vehicle = require("../modals/Vehicle_modal");
const Brand = require("../modals/Brand_modal");
const Reviews = require("../modals/Review_modal");
const stripe = require("stripe")(process.env.stripe_Testkey);
const Community = require("../modals/Community_modal");
const Session = require("../modals/Session_modal");
const { ObjectId } = require("mongodb");
const { CLIENT_URL } = process.env;
const express = require("express");
const app = express();
const server = require("http").Server(app);

const moment = require('moment');

const Userctrl = {
  register: async (req, res) => {
    try {
      console.log(req.body, "body");
      const { username, useremail, userpassword } = req.body;
      console.log(req.body);
      console.log(username);
      console.log(useremail);
      if (!username || !useremail || !userpassword)
        return res
          .status(400)
          .json({ msg: "Some fields are empty plase fill all fields" });

      if (!validateEmail(useremail))
        return res
          .status(400)
          .json({ msg: "email is not valid ! please enter a valid email" });

      const user = await Users.findOne({ email: useremail });
      if (user)
        return res.status(400).json({
          msg: "This email is already registerd! please try another one",
        });

      if (userpassword.length < 6)
        return res
          .status(400)
          .json({ msg: "password is short  must be atleast 6 characters" });

      const hashedpassword = await bycrypt.hash(userpassword, 12);
      console.log(hashedpassword);

      const newUser = {
        name: username,
        email: useremail,
        password: hashedpassword,
      };
      console.log(newUser);

      const activation_Token = createactivationToken(newUser);

      console.log(activation_Token);

      const url = `${CLIENT_URL}/users/activate/${activation_Token}`;

      try {
        sendMail(useremail, url, "Verify your email address to start");
        res.json({ msg: "Register success please activate Your email " });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      res.json({ msg: err });
      console.log(err);
    }
  },
  activateMail: async (req, res) => {
    try {
      const { activation_Token } = req.body;
      console.log(activation_Token);
      const user = jwt.verify(
        activation_Token,
        process.env.Activation_token_secret
      );
      console.log(user);

      const { name, password, email } = user;
      const check = await Users.findOne({ email: email });
      if (check) {
        console.log(check);
        return res.status(400).json({ msg: "This email is already exists" });
      } else {
        const newUser = new Users({
          name,
          email,
          password,
          status: "registered",
          isExpert: "no",
        });
        newUser.save();
        res.json({ msg: "Account has been activated successfully!" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      if (!email || !password)
        return res.status(400).json({ msg: "All field required" });

      const user = await Users.findOne({ email: email });
      if (!user)
        return res.status(400).json({ msg: "This email is not registered" });

      if (user.status === "blocked")
        return res
          .status(400)
          .json({ msg: "Your access is blocked or restricted...!" });

      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });

      const refresh_token = createrefreshToken({ id: user.id });
      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: "/users/refresh_Token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login Success", user,refresh_token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getaccessToken: (req, res) => {
    try {
      const rf_Token = req.cookies.refreshToken;
      console.log(rf_Token);
      if (!rf_Token) return res.status(400).json({ msg: "please login now!" });

      jwt.verify(rf_Token, process.env.Refresh_token_secret, (err, user) => {
        if (err) return res.status(400).json({ msg: "Login failed" });

        console.log(user);
        const access_Token = createaccessToken({ id: user.id });
        res.json({ access_Token });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      console.log(req.body);
      const { email } = req.body.values;
      console.log(email);
      const user = await Users.findOne({ email: email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist !" });

      const access_Token = createaccessToken({ id: user.id });
      const url = `${CLIENT_URL}/users/reset/${access_Token}`;

      sendMail(email, url, "Reset Your password");
      res.json({
        msg: "Reset password link successfully send please check your email!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await bycrypt.hash(password, 12);

      console.log(req.user, "This is  id");
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            password: passwordHash,
          },
        }
      );

      res.json({ msg: "Password successfully changed" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: error.message + "password error aane" });
    }
  },
  news: async (req, res) => {
    try {
      const news = await News.find();
      if (news) {
        res.json({ msg: "success", news });
      }
    } catch (error) {
      res.json({ error });
    }
  },
  getexperts: async (req, res) => {
    try {
      const experts = await Expert.find({ status: "approved" });
      res.json({ experts });
    } catch (error) {
      res.json({ error: "an error occured" });
      console.log(error);
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
      res.json({ error: { error } });
    }
  },
  payment: async (req, res) => {
    try {
      console.log(req.body);
      const expert = req.body.expert;
      console.log(expert._id);
      const expertId = expert.ExpertId;
      const currentDate = moment().format('YYYY-MM-DD');
     console.log(currentDate);
     Session.find({
      $expr: {
          $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: "$bookedTime" } },
              currentDate
          ]
      }
  })
  .then(sessions => {
      console.log(sessions);
  });
     







      
      // const user = req.body.userdetails;
      // const sessiondate=req.body.values.BookedDate
      // const session = await stripe.checkout.sessions.create({
      //   line_items: [
      //     {
      //       price_data: {
      //         currency: "inr",
      //         product_data: {
      //           name: "AutoEx ",
      //         },
      //         unit_amount: expert.Rate * 100,
      //       },
      //       quantity: 1,
      //     },
      //   ],
      //   mode: "payment",
      //   success_url: `${process.env.CLIENT_URL}/payment-succes?session_id={CHECKOUT_SESSION_ID}&expertid=${expertId}&date=${sessiondate}`,
      //   cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      // });

      // res.send({ url: session.url });
    } catch (error) {
      console.log(error);
    }
  },
  paymentsuccess: async (req, res) => {
    try {
      const redirectUrl = req.body.succesurl;
      const userdetails = req.body.userdetails;

      console.log(redirectUrl);
      

      const url = new URL(redirectUrl);
      const sessionId = url.searchParams.get("session_id");
      const expertId = url.searchParams.get("expertid");
      const sessiondate = url.searchParams.get("date");

      const userId = userdetails._id;
      // console.log(sessionId);
      console.log(expertId);
      const expert = await Expert.findOne({ ExpertId: ObjectId(expertId) });
      console.log(expert, "this is expert");
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log(session.status); // "succeeded" or "canceled"
      if (session.status === "complete") {
        console.log("payment is successful ");
        // Payment was successful, you can update the user's payment status in your database

        const sessiodetails = new Session({
          bookedTime: sessiondate,
          payment: "Done",
          user: userdetails.name,
          expertName: expert.Expertname,
          members: [userId, expertId],
        });

        sessiodetails.save().then(() => {
          res.json({ msg: "success fully created a session" });
        });
      } else {
        console.log("payment failed");
        res.json({ msg: "an error occures please try again" });
        // Payment was not successful, you can redirect the user to an error page or show an error message
      }
    } catch (error) {}
  },
  postReview: async (req, res) => {
    try {
      console.log(req.body);
      const details = req.body;
      const reviewdetails = new Reviews({
        rating: details.values.rating,
        review: details.values.review,
        vehicleid: details.cardetails._id,
        vehiclename: details.cardetails.Name,
        postedby: req.body.userdetails.name,
      });
      reviewdetails.save().then(() => {
        res.json({ msg: "successfully posted Review" });
      });
    } catch (error) {
      console.log(error);
      res.json({ msg: "an error occured" });
    }
  },
  review: async (req, res) => {
    try {
      const name = req.body.name;
      const reviews = await Reviews.find({ vehiclename: name });
      if (reviews) {
        res.json({ msg: "success", reviews });
      }
    } catch (error) {}
  },
  community: async (req, res) => {
    try {
      const community = await Community.find();
      res.json({ community });
    } catch (error) {}
  },
  sessions: async (req, res) => {
    try {
      const id = req.body.userid;

      console.log(id);
      const session = await Session.find({ members: id });
      if (session) {
        console.log(session);
      }
      res.json({session})
    } catch (error) {
      console.log(error);
    }
  },
  chatmessage: async (req, res) => {
    try {
      const id = req.body.sessionId;

      const session = await Session.findOne({ _id: ObjectId(id) });
      if (session) {
        console.log(session);
        res.json({ session });
      }
    } catch (error) {}
  },
  newmessage: async (req, res) => {
    try {
      console.log(req.body);

      console.log(req.body[1]);
      const message = req.body[0];
      const sessionid = req.body[1];
      console.log(sessionid.sessionId);

      const session = await Session.findOne({
        _id: ObjectId(sessionid.sessionId),
      });

      session.messages.push(message);

      await session.save().then(() => {
        res.json({ msg: "success" });
        console.log("success");
      });
    } catch (error) {
      console.log(error);
    }
  },
  addAvailability: async (req, res) => {
    try {
      console.log(req.body);
      const expertid = req.body.expertid;
      const dates = req.body.date;
      req.body.value;
      const response = await Expert.findOneAndUpdate(
        { ExpertId: expertid },
        {
          $push: {
            availableDays: dates,
          },
        }
      );
      res.status(200).json({ response });
    } catch (error) {
      console.log(error);
    }
  },
  removeAvilable: async (req, res) => {
    try {
      const expertid = req.body.expertid;
      const index = req.body.index;

      const response = await Expert.updateOne({ ExpertId: expertid }, [
        {
          $set: {
            availableDays: {
              $concatArrays: [
                { $slice: ["$availableDays", index] },
                {
                  $slice: [
                    "$availableDays",
                    { $add: [1, index] },
                    { $size: "$availableDays" },
                  ],
                },
              ],
            },
          },
        },
      ]);
      res.status(200).json({ response });
    } catch (error) {}
  },
  getdates: async (req, res) => {
    try {
      const expertid = req.body.expertid
      console.log(expertid)
      const expert = await Expert.findOne({ ExpertId: expertid });
      console.log(expert)
      const dates = expert.availableDays;
      res.json({ dates });
    } catch (error) {
      console.log(error);
    }
  },
};

const createactivationToken = (paylod) => {
  return jwt.sign(paylod, process.env.Activation_token_secret, {
    expiresIn: "5m",
  });
};

const createaccessToken = (paylod) => {
  return jwt.sign(paylod, process.env.Access_token_secret, {
    expiresIn: "15m",
  });
};

const createrefreshToken = (paylod) => {
  return jwt.sign(paylod, process.env.Refresh_token_secret, {
    expiresIn: "7d",
  });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = Userctrl;
