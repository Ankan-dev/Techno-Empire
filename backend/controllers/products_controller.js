const products = require('../models/project-model.js');
const category_model = require('../models/categories-model.js');
const teacherModel = require('../models/teacher-model.js');

const addProduct = async (req, res) => {
    const { category, image, description, name, price, discount } = req.body;
    const teacher = req.user;
    try {

        const findCategory = await category_model.findById(category);
        const findTeacher = await teacherModel.findById(teacher._id);

        if (!findCategory) {
            return res.json({
                message: "category not found",
                success: false
            })
        }

        if (!findTeacher) {
            return res.json({
                message: "Teacher not found",
                success: false
            })
        }

        const createProduct = await products.create({ creator: findTeacher._id, category, image, description, name, price, discount });

        findTeacher.Products.push(createProduct._id);
        await findTeacher.save({ validateBeforeSave: false });

        findCategory.products.push(createProduct._id);
        await findCategory.save({ validateBeforeSave: false });
        res.json({ message: "Product created successfully", success: true });
    } catch (error) {
        console.error(error);  // It's good practice to log errors for debugging
        res.json({ message: "Product creation failed", success: false });
    }
}

const deleteProductsById = async (req, res) => {
    let id = req.params.id;
    const teacher=req.user
    if(!teacher){
        return res.status(404)
                .json({
                    message:"teacher not found",
                    success:false
                })
    }
    try {
        const deleteProducts = await products.findByIdAndDelete(id);

        if (!deleteProducts) {
            return res.json({ message: "Product not found", success: false });
        }

        res.json({ message: "Product deleted successfully", success: true});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.json({ message: "Invalid product ID", success: false });
        }
        res.json({ message: error.message, success: false });
    }
}


const getAllProducts = async (req,res)=>{
    const allProducts= await Product.find();
    try{
        if(allProducts){
            res.json({products:allProducts,success:true});
        }else{
            res.json({products:"No products are present",success:false});
        }
    }catch(error){
        res.json({message:error.message,success:false});
    }
}

const getProductsById = async (req,res)=>{
    let id=req.params.id;
    const findProducts=await Product.findById(id);
    try{
        if(findProducts){
            res.json({products:findProducts,success:true});
        }else{
            res.json({message:"products not present",success});
        }
    }catch(error){
        res.json({message:error.message,success:false});
    }
}

const updateProductsById = async (req, res) => {
    let id = req.params.id;
    const teacher=req.user
    if(!teacher){
        return res.status(404)
                .json({
                    message:"teacher not found",
                    success:false
                })
    }
    try {
        const updateProducts = await products.findByIdAndUpdate(id, req.body, { new: true });

        if (!updateProducts) {
            return res.json({ message: "Product not found", success: false });
        }

        res.json({ message: "Product updated successfully", success: true});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.json({ message: "Invalid product ID", success: false });
        }
        res.json({ message: error.message, success: false });
    }
}

module.exports = {addProduct,deleteProductsById,getAllProducts,getProductsById,updateProductsById};