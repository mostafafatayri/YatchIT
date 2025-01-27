import User from "../models/USER.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import otpGenerator from "otp-generator";
import { v4 as uuidv4 } from 'uuid'; // UUID library for generating unique IDs

export const Authorization = async(req,res,next)=>{

  try{
    const AuthorizzationAdmin = req.isAdmin?req.isAdmin:'';
    const AuthorizzationSeller = req.isSeller;

    console.log("the aut "+ AuthorizzationAdmin);
    if(AuthorizzationAdmin==true ){
      res.status(200).send("admin");
      
    }else if(AuthorizzationSeller==true) {
      res.status(200).send("seller");
    }else {
      console.log(" i am going to send no\n")
      res.status(200).send("no");
    }


  }catch(err){
    res.status(500).send("berb an error occured")
  }
}

export const ResendEmailOTP = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Generate a new OTP
    const otpCode = otpGenerator.generate(6, { numeric: true, digits: false, alphabets: false, upperCase: false, specialChars: false });
    const otpExpiry = new Date(Date.now() + 1 * 60000); // Current time + 8 minutes

    // Find the user by ID and update OTP and OTPExpiry
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        OTP: otpCode,
        OTPExpiry: otpExpiry
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    // Optionally send email here
     sendEmail(updatedUser.email, updatedUser.firstname, otpCode, userId, "signUp");

    res.status(200).json({ message: "OTP has been resent successfully" });
  } catch (error) {
    next(error);
  }
};


export const verifyOTP = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.OTP !== otp) {
      return res.status(400).send("Invalid OTP");
    }

    const currentTime = new Date();
    if (currentTime > user.OTPExpiry) {
      return res.status(400).send("OTP has expired");
    }

    user.isVerified = true;
    await user.save();

    // Generate token
    const loginSessionId = uuidv4();
    const token = jwt.sign(
      {
        sessionId: loginSessionId,
        id: user._id,
        IsSeller: user.IsSeller,
        IsAdmin: user.IsAdmin,
        loginTime: Date.now(),
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Exclude password from the response
    const { password, ...info } = user._doc;

    res
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ message: "OTP verified successfully", info });
  } catch (err) {
    next(err);
  }
};

/** 
export const verifyOTP = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.OTP !== otp) {
      return res.status(400).send("Invalid OTP");
    }

    const currentTime = new Date();
    if (currentTime > user.OTPExpiry) {
      return res.status(400).send("OTP has expired");
    }

    user.isVerified = true;
    await user.save();

    // Generate token
    const loginSessionId = uuidv4();
    const token = jwt.sign(
      {
        IsAdmin: user.IsAdmin,
        sessionId: loginSessionId,
        id: user._id,
        updateAt: user.updatedAt,
        loginTime: Date.now(), // Adding a timestamp to ensure the token varies with each login
      },
      process.env.JWT_KEY,
      //  { expiresIn: '1h' } // Token expires in 1 hour
    );

    console.log(token);

    // Exclude password from the response
    const { password, ...info } = user._doc;

    res.status(200).json({ message: "OTP verified successfully", token, info });
  } catch (err) {
    next(err);
  }
};
**/

// maybe add a check that make only unverify account to work on this 
export const continueRegistration = async (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));

    const { userId, phone, dob, city, zip, gender } = req.body;

    // Find the user by ID and update the relevant fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        phone,
        DateOFBirth: dob,
        Country: city, // Assuming 'city' is actually the 'Country' field in your schema
        ZipCode: zip,
        gender, // Add gender to your schema if it doesn't exist
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};


export const register = async (req, res, next) => {
  try {
    console.log("connection accepted");
    console.log("the data is : " + JSON.stringify(req.body));
    
    const otpCode = otpGenerator.generate(6, { numeric: true, digits: false, alphabets: false, upperCase: false, specialChars: false });
    const hash = bcrypt.hashSync(req.body.password, 5);
    const otpExpiry = new Date(Date.now() + 8 * 60000); // Current time + 8 minutes

    const newUser = new User({
      ...req.body,
      password: hash,
      OTP: otpCode,
      OTPExpiry: otpExpiry
    });

    await newUser.save();
    
    const userId = newUser._id;

    // Optionally send email here
    sendEmail(req.body.email, req.body.firstname, otpCode, userId, "signUp"); 

    res.status(200).json({ message: "User has been created.", userId: userId });
  } catch (err) {
    next(err);
  }
};



export const ChangePassword = async (req, res, next) => {
  try {
    
    if(req.userId==req.body.id){
      const user = await User.findById(req.body.id);
    const token = jwt.sign({ userId: req.body.id, email: req.body.email },  process.env.JWT_CHANGE_EMAIL , { expiresIn: '1h' });

    
    const verificationLink = `http://localhost:4488/api/auth/verify-email?token=${token}`;

    sendEmail(req.body.email ,user.username, verificationLink,req.body.id,"changePass")
    console.log("Verification link:", verificationLink);

    res.status(200).send("Verification email sent");
    }else {
      res.status(304).send("You can not change a email if it is not ur account");
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).send("Error sending verification email");
  }
};


// change the email :
export const editEmail = async (req, res, next) => {
  try {
    
    if(req.userId==req.body.id){
      const user = await User.findById(req.body.id);
    const token = jwt.sign({ userId: req.body.id, email: req.body.email },  process.env.JWT_CHANGE_EMAIL , { expiresIn: '1h' });

    
    const verificationLink = `http://localhost:4488/api/auth/verify-email?token=${token}`;

    sendEmail(req.body.email ,user.username, verificationLink,req.body.id,"changeAccount")
    console.log("Verification link:", verificationLink);

    res.status(200).send("Verification email sent");
    }else {
      res.status(304).send("You can not change a email if it is not ur account");
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).send("Error sending verification email");
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
    console.log("the delete user is activating"+"the id from the verify is : "+req.userId);

    const user = await User.findById(req.body.userId);
  
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }
    
    await User.findByIdAndDelete(req.body.userId);
    res.status(200).send("deleted.");
  };
  
// send email for verification 
function sendEmail(email,username, otp,userId,action) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mostafafatayri@gmail.com',
          pass: process.env.EMAIL,
        },
      });
  
      let SIGN_UP_VERIFY = 'Account Verification';
      let SIGN_UP_TEXT =`Dear ${username},\nI hope this message finds you well. We value your continued trust in our services and are committed to ensuring the security of your account. As part of our ongoing efforts to enhance account security, we are implementing a two-step verification process. This is the OTP code that is required to complete the verification.\n\nOTP Code: ${otp}\n\nIf you did not initiate this verification process or have any concerns regarding the security of your account, please contact our support team immediately at [Your Support Contact Information].\n\nThank you for your prompt attention to this matter. We appreciate your cooperation in helping us maintain the highest standards of security for your account.\n\nBest regards. `;
    

      let CHANGE_EMAIL_VERIFY = "New Email Verification";
      let CHANGE_EMAIL_TEXT = `Dear ${username},\nI hope this message finds you well. We value your continued trust in our services and are committed to ensuring the security of your account. As part of your request to change the email of your account , we are implementing a two-step verification process. This is the Verification  code that is required to complete the verification of the new email.\n\nPress on this  Link: ${otp}\n\nIf you did not initiate this change  process or have any concerns regarding the security of your account, please contact our support team immediately at [Your Support Contact Information].\n\nThank you for your prompt attention to this matter. We appreciate your cooperation in helping us maintain the highest standards of security for your account.\n\nBest regards. `
    


      let EmailSubject ='';
      let EmailText='';
      if (action==='signUp'){
        EmailSubject=SIGN_UP_VERIFY;
        EmailText=SIGN_UP_TEXT;

      }
      if(action==='changeAccount'){
        EmailSubject=CHANGE_EMAIL_VERIFY;
        EmailText=CHANGE_EMAIL_TEXT;

      }
      const mailConfigs = {
        from: 'mostafafatayri@gmail.com',
        to: email,
        subject: EmailSubject,
        text: EmailText,
      };
  
      transporter.sendMail(mailConfigs, (error, info) => {
        if (error) {
          console.log(error);
          reject({ message: 'Boss, we got an error' });
        } else {
          resolve({ message: 'Email sent successfully' });
        }
      });
      console.log("testing the email ")
    });
  }
  
/*
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'User not found!'));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, 'Wrong password or username!'));


    console.log("check if the user is vrf ");
    if(user.isVerified){
    const loginSessionId = uuidv4();
    const token = jwt.sign(
      {
        sessionId: loginSessionId,
        id: user._id,
        IsSeller: user.IsSeller,
        IsAdmin: user.IsAdmin,
        loginTime: Date.now(),
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    console.log("the user is : "+user.IsSeller);
    const { password, ...info } = user._doc;

    res
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure the cookie is secure in production
        sameSite: 'strict',
      })
      .status(200)
      .json({ info });

    }else {


    }
  } catch (err) {
    next(err);
  }


};
*/


export const logout = async (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};



export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'User not found!'));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, 'Wrong password or username!'));

    if (user.isVerified) {
      console.log("the login in is sign token  "+user.IsSeller);
      const loginSessionId = uuidv4();
      const token = jwt.sign(
        {
          sessionId: loginSessionId,
          id: user._id,
          IsSeller: user.IsSeller,
          IsAdmin:user.IsAdmin,
          loginTime: Date.now(),
        },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );

      const { password, ...info } = user._doc;

      res
        .cookie('accessToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .status(200)
        .json({ info });
    } else {
      // User is not verified
      res.status(403).json({
        message: 'User is not verified. Please verify your email before logging in.',
        data: { userId: user._id },
      });

    }
  } catch (err) {
    next(err);
  }
};
