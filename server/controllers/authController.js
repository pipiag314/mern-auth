const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if name is entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //check if password is good
    if (!password || password.length < 8) {
      return res.json({
        error: "password is required, it should be at least 8 characters long",
      });
    }

    // check if email is unique
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is already used",
      });
    }

    const hashedPassword = await hashPassword(password)
    // create user into database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // check if user exists
    const user = await User.findOne({email})
    if(!user) {
      return res.json({
        error: "User with this email not found!",
      })
    }

    // check if passwords match
    const match = await comparePasswords(password, user.password)
    if(match) {
      jwt.sign({ email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
        if(err) throw err;
        res.cookie("token", token).json(user)
      })

    } else {
      return res.json({
        error: "passwords not matched!"
      })
    }
  } catch (error) {
    console.log(error)
  }
}


const getProfile = (req, res) => {
  const {token} = req.cookies;
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if(err) throw(err);
      res.json(user);
    })
  } else {
    res.json(null)
  }
}


module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
