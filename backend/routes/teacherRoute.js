const express=require('express');
const router=express.Router();
const {Register,validateCode,login,logout,profile} = require('../controllers/teacher_controller.js')
const {authenticateTeacher}=require('../middlewares/auth.js')

router.post('/register-teacher',Register);
router.post('/validate-teacher',validateCode);
router.post('/login-teacher',login);
router.post('/logout-teacher',authenticateTeacher,logout)
router.get('/profile-teacher',authenticateTeacher,profile)

module.exports=router;
