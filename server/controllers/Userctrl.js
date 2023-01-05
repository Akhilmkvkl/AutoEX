const Users = require("../modals/user_model");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./Sendmail");

require("dotenv").config();

const { CLIENT_URL } = process.env;

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
        return res.status(400).json({ msg: "Your access is blocked or restricted...!" });

      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });

      const refresh_token = createrefreshToken({ id: user.id });
      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: "/users/refresh_Token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login Success" });
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
      const { email } = req.body;
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
