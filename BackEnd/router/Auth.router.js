import express from "express";
import  {
          register,
          login,
          continueRegistration,
          verifyOTP,
          ResendEmailOTP,
          logout,
          Authorization
        
        } from "../controller/Auth.controller.js"
const router = express.Router();
import { verifyToken } from "../middleware/jwt.js";


router.post("/register", register);
router.post("/registration/moreInfo",continueRegistration);
router.post("/registration/verifyOTP",verifyOTP);
router.post("/registration/resendOTP",ResendEmailOTP);
router.post("/login", login);
router.post("/logout" ,logout);
router.get("/user_roles",verifyToken,Authorization);
/** 
router.delete("/DeleteMyAccount",verifyToken,deleteUser)

router.post("/changeEmailAddress",verifyToken,editEmail);
router.get("/verify-email",verifyEmail)

**/
 
export default router;