import express, { application } from "express";
import ProductController from "../controllers/ProductController.js";
import Userauth from "../middleware/middlewareController.js";
const ProductRouter = express.Router()
ProductRouter.use('/addToCart',Userauth)
ProductRouter.use('/removeFromCart',Userauth)
ProductRouter.use('/clearCart',Userauth)
ProductRouter.use('/getAddToCartProductsByUserId/:userId', Userauth)

ProductRouter.use('/removeFromCart',Userauth)
// create
ProductRouter.post('/createProductRouterItem', ProductController.createProductItem)
ProductRouter.post('/addToCart', ProductController.addToCart)
ProductRouter.post('/removeFromCart', ProductController.removeFromCart)
ProductRouter.post('/clearCart', ProductController.clearCart)
ProductRouter.post('/pay', ProductController.payment)
// get
ProductRouter.get('/getAllProducts', ProductController.getProductItem)
ProductRouter.get('/getProductById/:id', ProductController.getProductById)
ProductRouter.get('/getAddToCartProductsByUserId/:userId', ProductController.getAddToCartProductsByUserId)

// update
ProductRouter.put('/updateProductRouterItem/:id', ProductController.updateProductItem)

// delete
ProductRouter.delete('/deleteProductRouterItem/:id', ProductController.deleteProductItem)




export default ProductRouter