import express, { application } from "express";
import ProductController from "../controllers/ProductController.js";
const ProductRouter = express.Router()
// create
ProductRouter.post('/createProductRouterItem', ProductController.createProductItem)

// get
ProductRouter.get('/getProductRouterItem', ProductController.getProductItem)

// update
ProductRouter.put('/updateProductRouterItem/:id', ProductController.updateProductItem)

// delete
ProductRouter.delete('/deleteProductRouterItem/:id', ProductController.deleteProductItem)




export default ProductRouter