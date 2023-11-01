const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register =  async (req, res) => {
    console.log(req.body);
  const { name, email, password } = req.body;
  try {

    // Existing user check
    const existingUser = await userModel.findOne({ email: email });
    console.log(existingUser)
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash password: ",hashedPassword)
    // Create user
    const restult = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // Token generation
    const token = jwt.sign({ email: restult.email, id: restult._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ user: restult, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try{

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
          return res.status(400).json({ message: "User Not Found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", {
            expiresIn: "1h",
        });
        res.status(200).json({ user: existingUser, token: token });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { register, login };
