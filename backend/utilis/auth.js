const bcrypt = require("bcrypt");
const { SECRET } = require("../config/key");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");



//register user
const userRegister = async (userDets, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Username is already taken.",
        success: false,
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "Email is already registered.",
        success: false,
      });
    }

    // Get the hashed password
    const pwd = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      nom: userDets.nom,
      prenom: userDets.prenom,
      email: userDets.email,
      telephone: userDets.telephone,
      addresse: userDets.addresse,
      password: pwd,
      username: userDets.username,
      role: role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login.",
      success: true,
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account." + err,
      success: false,
    });
  }
};
const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};



const userAuth = passport.authenticate("jwt", { session: false });


//user login

const userLogin = async (userCreds, role, res) => {
  try {
    let { username, password } = userCreds;
    // First Check if the username is in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "Username is not found. Invalid login credentials.",
        success: false,
      });
    }
    // We will check the role
    if (user.role !== role) {
      return res.status(403).json({
        message: "Please make sure you are logging in from the right portal.",
        success: false,
      });
    }
    // That means user is existing and trying to signin fro the right portal
    // Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        SECRET,
        { expiresIn: "2592000" }
      );

      let result = {
        username: user.username,
        role: user.role,
        id:user._id,
        email: user.email,
        token: token,
        expiresIn: 900,
      };
     

      return res.status(200).json({
        user:{
          id:result.id,
          username:result.username,
          role:result.role,
          email:result.email
        },
        token:result.token,
        message: "Hurray! You are now logged in.",
        success: true,
      });
    } else {
      return res.status(403).json({
        message: "Incorrect password.",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable to login your account." + err,
      success: false,
    });
  }
};


const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();




    
    
    
    const authen = (req, res, next) => {
      const token = req.header("Authorization");
    
      if (!token)
        return res.status("401").json({ msg: "Access denied, please login" });
    
      try {
        const decoded = jwt.verify(token,  SECRET);
        req.userid = decoded.id;
        next();
      } catch (error) {
        return res
          .status("400")
          .json({ msg: "Token not valid, please login again" });
      }
    };
    


module.exports = {
  authen,
  userAuth,
  userRegister,
  userLogin,
  checkRole,
  
};
