import express from "express";
import  {
         AddYatch,
         GetAYacht,
         GetFullYatchs
        
        } from "../controller/Yacht.controller.js"
const router = express.Router();
import {verifyToken} from '../middleware/jwt.js';


router.post("/actions/addYatch",verifyToken, AddYatch);
router.get('/getYacht/:id', GetAYacht);
router.get("/getAll",GetFullYatchs)
 
export default router;