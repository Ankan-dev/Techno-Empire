const express=require('express');
const {addProduct,deleteProductsById,getAllProducts,getProductsById,updateProductsById}=require('../controllers/products_controller.js')
const auth=require('../middlewares/auth.js')


const router=express.Router();

router.post('/add-product',auth,addProduct);
router.post('/delete-product',auth,deleteProductsById);
router.get('/get-all-products',getAllProducts);
router.get('/get-products-by-id',getProductsById)
router.put('/update-products',auth,updateProductsById);

module.exports=router