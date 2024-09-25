const express=require('express')
const router=express.Router();
const {RegisterStudent,verifyEmail,profile,login,logout,deleteToken,resendCode,updateProfileDetails} =require('../controllers/student_controller.js');
const {authenticateUser}=require('../middlewares/auth.js')

router.post('/register-student',RegisterStudent);
router.post('/verify-student',verifyEmail);
router.get('/student-profile',authenticateUser,profile);
router.post('/student-login',login);
router.post('/student-logout',authenticateUser,logout);
router.put('/student-resend',resendCode);
router.delete('/student-deleteToken',deleteToken);
router.put('/student-updateDetails', authenticateUser,updateProfileDetails);


module.exports=router