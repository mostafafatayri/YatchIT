import mongoose from "mongoose";
const { Schema } = mongoose;

const SellerSchema = new Schema({
 
  SellerID:{
     type: String,
     required:true
  },
  Image: {
    type: String,
    required: false,
    default:''

  },
  isActive:{
    type:Boolean,
    default:false

  },
  YatchID: {
    type: [String],
    required: false,
    default:[]
  },

  


},{
  timestamps:true
});

export default mongoose.model("Seller", SellerSchema)