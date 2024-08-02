import User from "../models/USER.model.js";
import createError from "../utils/createError.js";
import Yacht from "../models/YACHT.model.js";
import Review from "../models/REVIEWS.model.js";
import mongoose from "mongoose";


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


//
export const GetFullYatchs = async (req, res, next) => {
  try {
    console.log("Fetching yachts with marina names");

    const {
      marina,
      tripDate,
      vehicleType,
      minPrice,
      maxPrice,
      numberOfPeople,
      withCrew,
      freeCancellation,
      sailboat,
      motorboat,
      catamaran,
      yacht,
      jetSki,
      dinghy
    } = req.query;

    console.log("the marina selected " + marina);

    // Build the match stage based on the filters
    const matchStage = {};

    if (marina) {
      matchStage['marinaName'] = marina;
    }
    if (vehicleType) {
      matchStage.vehicleType = vehicleType;
    }
    if (minPrice) {
      matchStage.price = { ...matchStage.price, $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      matchStage.price = { ...matchStage.price, $lte: parseFloat(maxPrice) };
    }
    if (numberOfPeople) {
      matchStage.Guests = { $gte: parseInt(numberOfPeople) };
    }
    if (withCrew === 'true') {
      matchStage.withCrew = true;
    }
    if (freeCancellation === 'true') {
      matchStage.freeCancellation = true;
    }

    // Build an array of vehicle types based on the selected categories
    const vehicleTypes = [];
    if (sailboat === 'true') vehicleTypes.push('Sailboat');
    if (motorboat === 'true') vehicleTypes.push('Motor Boat');
    if (catamaran === 'true') vehicleTypes.push('Catamaran');
    if (yacht === 'true') vehicleTypes.push('Yacht');
    if (jetSki === 'true') vehicleTypes.push('JetSki');
    if (dinghy === 'true') vehicleTypes.push('Dinghy');

    if (vehicleTypes.length > 0) {
      matchStage.vehicleType = { $in: vehicleTypes };
      console.log("entered the chat \n");
      console.log(sailboat+" sail  \n");
      console.log(motorboat+" moto\n");
      console.log(catamaran+" cater \n");
      console.log(yacht+"  yacht \n");
      console.log(jetSki+" jetski  \n");
      console.log(dinghy+"  dng  \n");
    }

    console.log("Testing the filter " + vehicleType);

    const yachts = await Yacht.aggregate([
      {
        $addFields: {
          MarinaID: { $toObjectId: "$MarinaID" } // Cast MarinaID to ObjectId
        }
      },
      {
        $lookup: {
          from: 'marinas', // The name of the Marina collection
          localField: 'MarinaID', // Field from the Yacht collection
          foreignField: '_id', // Field from the Marina collection
          as: 'marina' // The name of the array field to be added to each output document
        }
      },
      {
        $unwind: '$marina' // Deconstruct the array field to get the object
      },
      {
        $addFields: {
          marinaName: '$marina.marinaName' // Add the marinaName field
        }
      },
      {
        $project: {
          _id: 1,
          sellerID: 1,
          vehicleName: 1,
          vehicleType: 1,
          price: 1,
          description: 1,
          bedrooms: 1,
          bathrooms: 1,
          Guests: 1,
          Images: 1,
          Engine: 1,
          Torque: 1,
          FuelSystem: 1,
          boreStroke: 1,
          Capacity: 1,
          Weight: 1,
          FuelCap: 1,
          Equipment: 1,
          Ratings: 1,
          Raters: 1,
          MarinaID: 1,
          RentDuration: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          marinaName: 1, // Ensure marinaName is included
          categories: 1 // Ensure categories are included
        }
      },
      {
        $match: matchStage // Apply the match stage after the lookup and projection stages
      }
    ]);

   // console.log("The data of marina after filter :" + JSON.stringify(yachts));
    if (!yachts || yachts.length === 0) {
      return res.status(404).json({ message: "No yachts found" });
    }

    res.status(200).json(yachts);
  } catch (err) {
    console.error(err);
    next(createError(500, "Internal server issue"));
  }
};

///
//

/*
this is the best way to solve it : 
export const GetFullYatchs = async (req, res, next) => {
  try {
    console.log("Fetching yachts with marina names");

    const {
      marina,
  
      vehicleType,
      minPrice,
      maxPrice,
      numberOfPeople,
      withCrew,
      freeCancellation,
      sailboat,
      motorboat,
      catamaran,
      quiet,
      jetSki,
      houseboat
    } = req.query;

    console.log("the marina selected "+marina);
    // Build the match stage based on the filters
    const matchStage = {};

    if (marina) {
      matchStage['marinaName'] = marina;
    }
    if (vehicleType) {
      matchStage.vehicleType = vehicleType;
    }
    if (minPrice) {
      matchStage.price = { ...matchStage.price, $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      matchStage.price = { ...matchStage.price, $lte: parseFloat(maxPrice) };
    }
    if (numberOfPeople) {
      matchStage.Guests = { $gte: parseInt(numberOfPeople) };
    }
   
 

    const yachts = await Yacht.aggregate([
      {
        $addFields: {
          MarinaID: { $toObjectId: "$MarinaID" } // Cast MarinaID to ObjectId
        }
      },
      {
        $lookup: {
          from: 'marinas', // The name of the Marina collection
          localField: 'MarinaID', // Field from the Yacht collection
          foreignField: '_id', // Field from the Marina collection
          as: 'marina' // The name of the array field to be added to each output document
        }
      },
      {
        $unwind: '$marina' // Deconstruct the array field to get the object
      },
      {
        $addFields: {
          marinaName: '$marina.marinaName' // Add the marinaName field
        }
      },
      {
        $project: {
          _id: 1,
          sellerID: 1,
          vehicleName: 1,
          vehicleType: 1,
          price: 1,
          description: 1,
          bedrooms: 1,
          bathrooms: 1,
          Guests: 1,
          Images: 1,
          Engine: 1,
          Torque: 1,
          FuelSystem: 1,
          boreStroke: 1,
          Capacity: 1,
          Weight: 1,
          FuelCap: 1,
          Equipment: 1,
          Ratings: 1,
          Raters: 1,
          MarinaID: 1,
          RentDuration: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          marinaName: 1, // Ensure marinaName is included
          categories: 1 // Ensure categories are included
        }
      },
      {
        $match: matchStage // Apply the match stage after the lookup and projection stages
      }
    ]);

    console.log("the data of marina after filter :"+JSON.stringify(yachts));
    if (!yachts || yachts.length === 0) {
      return res.status(404).json({ message: "No yachts found" });
    }

    res.status(200).json(yachts);
  } catch (err) {
    console.error(err);
    next(createError(500, "Internal server issue"));
  }
};
*/


// new update under testing  with no filter actions 
/*export const GetFullYatchs = async (req, res, next) => {
  try {
    console.log("Fetching yachts with marina names");

    const yachts = await Yacht.aggregate([
      {
        $addFields: {
          MarinaID: { $toObjectId: "$MarinaID" } // Cast MarinaID to ObjectId
        }
      },
      {
        $lookup: {
          from: 'marinas', // The name of the Marina collection
          localField: 'MarinaID', // Field from the Yacht collection
          foreignField: '_id', // Field from the Marina collection
          as: 'marina' // The name of the array field to be added to each output document
        }
      },
      {
        $unwind: '$marina' // Deconstruct the array field to get the object
      },
      {
        $addFields: {
          marinaName: '$marina.marinaName' // Add the marinaName field
        }
      },
      {
        $project: {
          _id: 1,
          sellerID: 1,
          vehicleName: 1,
          vehicleType: 1,
          price: 1,
          description: 1,
          bedrooms: 1,
          bathrooms: 1,
          Guests: 1,
          Images: 1,
          Engine: 1,
          Torque: 1,
          FuelSystem: 1,
          boreStroke: 1,
          Capacity: 1,
          Weight: 1,
          FuelCap: 1,
          Equipment: 1,
          Ratings: 1,
          Raters: 1,
          MarinaID: 1,
          RentDuration: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          marinaName: 1 // Ensure marinaName is included
        }
      }
    ]);
//// make the filterr check here after all the data is check 
    if (!yachts) {
      return res.status(404).json({ message: "Error fetching yachts" });
    }

    res.status(200).json(yachts);
  } catch (err) {
    console.error(err);
    next(createError(500, "Internal server issue"));
  }
};
*/

/*
// best solution 
export const GetFullYatchs = async(req,res,next)=>{
  try {
   

     console.log(" test \n");
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

*/
export const AddReview = async (req, res, next) => {
  const { userId, yachtId, rating, feedback } = req.body;

  try {
    // Validate the input data
    if (!userId || !yachtId || !rating || !feedback) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new review object
    const newReview = new Review({
      userId,
      yachtId,
      rating,
      feedback,
      createdAt: new Date()
    });

    // Save the review to the database
    const savedReview = await newReview.save();

    // Update the ratings array in the Yacht document
    const yacht = await Yacht.findById(yachtId);
    if (!yacht) {
      return res.status(404).json({ message: 'Yacht not found' });
    }

    // Increment the appropriate index in the ratings array
    yacht.ratings[rating]++;
    await yacht.save();

    // Respond with the saved review
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const getYachtReviews = async (req, res, next) => {
  const { id: yachtID } = req.params; // Correctly extract yachtID from req.params

  console.log(`Fetching reviews for yachtID: ${yachtID}`);

  try {
    // Ensure yachtID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(yachtID)) {
      return res.status(400).json({ message: 'Invalid yacht ID' });
    }

    // Convert yachtID to ObjectId
    const objectIdYachtID = new mongoose.Types.ObjectId(yachtID);

    // Fetch reviews and join with user information
    const reviews = await Review.aggregate([
      { $match: { yachtId: objectIdYachtID } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          rating: 1,
          feedback: 1,
          createdAt: 1,
          'user.firstname': 1,
          'user.lastname': 1,
          'user.Country':1
        }
      }
    ]);

    // Respond with the fetched reviews
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
