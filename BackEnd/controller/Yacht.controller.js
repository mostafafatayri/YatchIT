import User from "../models/USER.model.js";
import createError from "../utils/createError.js";
import Yacht from "../models/YACHT.model.js";

export const AddYatch = async (req, res, next) => {
  try {
    // Parse the received data
    const {
      title,
      boatType,
      price,
      description,
      bedrooms,
      bathrooms,
      guests,
      files, // This should be an array of image URLs after uploading to Cloudinary
      engine,
      torque,
      fuelSystem,
      boreStroke,
      fuelCap,
      capacity,
      fuelEconomy,
      weight,
      equipment,
      marinaID
    } = req.body;

    console.log(req.body);
    // Create a new instance of the Yacht model
    const newYacht = new Yacht({
      vehicleName: title,
      vehicleType: boatType,
      price: parseFloat(price), // Ensure the price is stored as a number
      description,
      bedrooms: parseInt(bedrooms), // Ensure the bedrooms count is stored as a number
      bathrooms: parseInt(bathrooms), // Ensure the bathrooms count is stored as a number
      Guests: parseInt(guests), // Ensure the guests count is stored as a number
      Images: files, // Array of image URLs
      Engine: engine,
      Torque: torque,
      FuelSystem: fuelSystem,
      boreStroke,
      FuelCap: fuelCap,
      Capacity: parseInt(capacity), // Ensure the capacity is stored as a number
      Weight: weight,
      FuelEconomy: fuelEconomy,
      Equipment: equipment, // Array of equipment strings
      MarinaID:marinaID
    });

    // Save the new yacht to the database
    const savedYacht = await newYacht.save();

    // Send a success response
    res.status(200).json(savedYacht);
  } catch (err) {
    // Handle errors
    console.error(err);
    next(createError(500, "Internal server issue"));
  }
};
