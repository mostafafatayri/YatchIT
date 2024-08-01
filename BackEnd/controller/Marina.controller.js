import User from "../models/USER.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import Marina from "../models/MARINA.model.js";


export const AddMarina = async (req, res, next) => {
    try {
        // Destructure the data from req.body
        const { marinaName, location, capacity, facilities, contact, description, Image } = req.body;

        // Create a new Marina document
        const newMarina = new Marina({
            marinaName,
            location,
            capacity,
            facilities,
            contact,
            description,
            Image // Ensure this matches what you send from the frontend
        });

        // Save the document to the database
        await newMarina.save();

        // Send a success response
        res.status(201).json({ message: "Marina added successfully" });
    } catch (err) {
        // Handle errors
        console.error(err);
        next(createError(500, "Internal server issue"));
    }
}


export const getMarinas = async (req, res, next) => {
    try {
       
        const marinas = await Marina.find();

        console.log(marinas+" all the data \n");
        res.status(200).json(marinas);
    } catch (err) {
      
        console.error(err);
        next(createError(500, "Internal server issue"));
    }
};