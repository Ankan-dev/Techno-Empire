const express=require('express');
const router=express.Router()
const {createCategory,getCategories}=require('../controllers/categories_controller.js')
const auth=require('../middlewares/auth.js');


router.get('/get-category',getCategories);
router.post('/create-category',auth,createCategory)
