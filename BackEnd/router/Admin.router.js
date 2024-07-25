import express from "express";
import  {
     CreateSeller,
     CreateAdmin
       
        
    } from "../controller/Admin.controller.js"
const router = express.Router();
import { verifyToken } from "../middleware/jwt.js";
//app.use("/api/adminActions",Admin);

router.post("/create_seller",CreateSeller);/// should check the token of the user 
router.post("/create_admin",CreateAdmin);
 
export default router;