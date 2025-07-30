const express = require('express');
//const Product = require('../models/productModel')
const {getProducts,getProductsById,getProductsByName,createProducts,updateProducts,deleteProducts} = require ('../controllers/productController')


const router = express.Router();


//get product 
router.get('/',getProducts );

//get product by Id
router.get('/:id',getProductsById )

//get product by Name
router.get('/:name',getProductsByName )

//create product
router.post('/',createProducts)

// update a product
router.put('/:id',updateProducts )

// delete a product
router.delete('/:id',deleteProducts)


module.exports = router;