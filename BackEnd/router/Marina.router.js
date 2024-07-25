import express from "express";
import  {
         AddMarina,
         getMarinas
        
        } from "../controller/Marina.controller.js"
const router = express.Router();
import { verifyToken } from "../middleware/jwt.js";


router.post("/addMarina", verifyToken ,AddMarina) // should add some restruction and checks on the api 
router.get("/getAllMarinas",getMarinas);
 
export default router;