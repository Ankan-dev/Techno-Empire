const express=require('express')
const router=express.Router();
const {RegisterStudent,verifyEmail,profile,login,logout,deleteToken,resendCode,updateProfileDetails} =require('../controllers/student_controller.js');
const auth=require('../middlewares/auth.js')

router.post('/register-student',RegisterStudent);
router.post('/verify-student',verifyEmail);
router.get('/student-profile',auth,profile);
router.post('/student-login',login);
router.put('/student-logout',auth,logout);
router.put('/student-resend',resendCode);
router.put('/student-deleteToken',deleteToken);
router.put('/student-updateDetails',auth,updateProfileDetails);
module.exports=router