import express from "express";
import  {
          register,
          login,
          continueRegistration,
          verifyOTP,
          ResendEmailOTP
        
        } from "../controller/Auth.controller.js"
const router = express.Router();
//import { verifyToken } from "../middleware/jwt.js";


router.post("/register", register);
router.post("/registration/moreInfo",continueRegistration);
router.post("/registration/verifyOTP",verifyOTP);
router.post("/registration/resendOTP",ResendEmailOTP);

router.post("/login", login);

/** 
router.delete("/DeleteMyAccount",verifyToken,deleteUser)
router.post("/logout", logout)
router.post("/changeEmailAddress",verifyToken,editEmail);
router.get("/verify-email",verifyEmail)
router.post('/apply-seller', checkCompany);
**/
 
export default router;