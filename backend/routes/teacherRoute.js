const express=require('express');
const router=express.Router();
const {RegisterTeacher,verifyEmail,profile,login,logout,deleteToken,resendCode}=require('../controllers/teacher_controller.js');
const auth=require('../middlewares/auth.js')


router.post('/register-teacher',RegisterTeacher);
router.put('/verify-teacher',verifyEmail);
router.get('/teacher-profile',auth,profile);
router.post('/teacher-login',login);
router.put('/teacher-logout',auth,logout);
router.post('/teacher-logout',resendCode);
router.put('/teacher-logout',deleteToken);


module.exports=router