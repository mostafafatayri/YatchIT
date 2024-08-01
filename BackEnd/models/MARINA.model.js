// models/Marina.js\
import mongoose from "mongoose";
const { Schema } = mongoose;


const MarinaSchema = new mongoose.Schema({
  marinaName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  facilities: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Image:
  {
    type:String,
    required:true
  }
});

const Marina = mongoose.model('Marina', MarinaSchema);

export default Marina;
