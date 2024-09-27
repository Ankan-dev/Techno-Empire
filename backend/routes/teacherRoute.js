const express=require('express');
const router=express.Router();
const {Register,validateCode,login,logout} = require('../controllers/teacher_controller.js')
const {authenticateTeacher}=require('../middlewares/auth.js')

router.post('/register-teacher',Register);
router.post('/validate-teacher',validateCode);
router.post('/login-teacher',login);
router.post('/logout-teacher',authenticateTeacher,logout)

module.exports=router;
