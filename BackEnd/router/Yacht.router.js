import express from "express";
import  {
         AddYatch,
        
        
        } from "../controller/Yacht.controller.js"
const router = express.Router();



router.post("/actions/addYatch", AddYatch);

 
export default router;