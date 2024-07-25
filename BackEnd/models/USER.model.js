import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  OTP:{
    type: String,
    required:false
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    default:""
  },
  firstname:{
     type:String,
  
     required:false
  },
  lastname:{
    type:String,
    required:false
  },

  isVerified:
  {
    type:Boolean,
    default:false
  },

  tempEmail:{
    type:String,
     required:false
  },
  DateOFBirth:{
    type:Date,
    required:false,
    default:""
  },
  ZipCode:{
    type:Number,
    required:false,
    default:"0000"
  },
  Country:{
    type:String,
    required:false,
    default:""
  },
  OTPExpiry:{
    type:Date,
    required:false
  },
  bio:{
    type:String,
    required:false,
    default:""
  },
  IsSeller:{
    type:Boolean,
    default:false,

  },
  IsAdmin:{
    type:Boolean,
    required:false,
  }


},{
  timestamps:true
});

export default mongoose.model("User", userSchema)