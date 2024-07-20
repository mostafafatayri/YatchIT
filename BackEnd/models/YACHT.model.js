import mongoose from "mongoose";
const { Schema } = mongoose;

const YachtSchema = new Schema({
 
  vehicleName: {
    type: String,
    required: true,
  },
  vehicleType :{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  bedrooms:{
    type:Number,
    required:true
  },
  bathrooms:{
    type:Number,
    required:true
  },
  Guests:{
    type:Number,
    required:true
  },
  Images:{
    type:[String],
    required:true
  },
  Engine:{
    type:String,
    required:true
  },
  Torque:{
    type:String,
    required:true
  },
  FuelSystem:{
    type:String,
    required:true
  },
  boreStroke:{
    type:String,
    required:true
  },
  
  Capacity:{
    type:Number,
    required:true
  },
  Weight:{
    type:String,
    required:true
  },
  FuelCap:{
    type:String,
    required:true
  },
  Equipment:{
    type:[String],
    required:true
  }



},{
  timestamps:true
});

export default mongoose.model("Yacht", YachtSchema)