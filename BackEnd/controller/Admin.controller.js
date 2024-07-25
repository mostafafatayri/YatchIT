import User from "../models/USER.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import otpGenerator from "otp-generator";
import { v4 as uuidv4 } from 'uuid'; // UUID library for generating unique IDs
import Seller from "../models/SELLER.model.js";

export const CreateSeller = async (req, res, next) => {
  try {
    console.log("hello world" + JSON.stringify(req.body) + " the email is " + req.body.email);
    const { email, name, lastname, phone, address, yearsOfExperience, profilePhoto, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      email,
      firstname: name,
      lastname,
      phone,
      Country: address, // Assuming you have added address to the user model
      DateOFBirth: yearsOfExperience, // Assuming you have added yearsOfExperience to the user model
      password: hashedPassword,
      IsSeller: true,
    });
    // Save the new user
    await user.save();
    // Create a new seller linked to the user
    const seller = new Seller({
      SellerID: user._id,
      Image: profilePhoto,
    });
    // Save the new seller
    await seller.save();
    res.status(200).json({ message: "User created and updated to seller", user, seller });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const CreateAdmin = async(req,res,next)=>{

    try {
        console.log("hello world" + JSON.stringify(req.body) + " the email is " + req.body.email);
        const { email, name, lastname, phone, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: "User with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
          email,
          firstname: name,
          lastname,
          phone,
          password: hashedPassword,
          IsSeller: true,
          IsAdmin:true,
        });
        // Save the new user
        await user.save();
    

        res.status(200).json({ message: "User created and updated to admin", user });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
};