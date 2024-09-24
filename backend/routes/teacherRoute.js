const express=require('express');
const router=express.Router();
const {Register,validateCode,login} = require('../controllers/teacher_controller.js')


router.post('/register-teacher',Register);
router.put('/validate-teacher',validateCode);
router.put('/login-teacher',login);

module.exports=router;
