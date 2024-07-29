import User from "../models/USER.model.js";
import createError from "../utils/createError.js";
import Yacht from "../models/YACHT.model.js";

export const AddYatch = async (req, res, next) => {
  try {
    const UserRole = req.isSeller;

    console.log("the role is " + UserRole);
    if (!UserRole) {
      console.log("it entered here ");
      return res.status(403).json({ message: "You are not a seller, you cannot add a yacht" });
    } else {
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
        marinaID,
        sellerID,
        priceType,
        hours,
      } = req.body;

      const jwtSellerID = req.userId;
      if (jwtSellerID !== sellerID) {
        return res.status(403).json({ message: "You cannot add a yacht for a different seller" });
      } else {
        console.log(req.body);
        // Create a new instance of the Yacht model
        const newYacht = new Yacht({
          sellerID: req.body.sellerID,
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
          MarinaID: marinaID,
          RentDuration:hours>0?hours:priceType,
        });

        // Save the new yacht to the database
        const savedYacht = await newYacht.save();

        // Send a success response
        return res.status(200).json(savedYacht);
      }
    }
  } catch (err) {
    // Handle errors
    console.error(err);
    next(createError(500, "Internal server issue"));
  }
};
 


export const GetAYacht = async (req, res, next) => {
  try {
    const yachtId = req.params.id;

    // Find the yacht by ID
    const yacht = await Yacht.findById(yachtId);

    if (!yacht) {
      return res.status(404).json({ message: "Yacht not found" });
    }

    res.status(200).json(yacht);
  } catch (err) {
    console.error(err);
    next(createError(500, "Internal server issue"));
  }
};

export const GetFullYatchs = async(req,res,next)=>{
  try {
   

 
    const yacht = await Yacht.find();

    if (!yacht) {
      return res.status(404).json({ message: "error fetching yatchs" });
    }

    res.status(200).json(yacht);
  } catch (err) {
    console.error(err);
    next(createError(500, "Internal server issue"));
  }

}