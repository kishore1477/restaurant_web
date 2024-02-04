import AddToCart from "../moddle/AddToCart.js"
import Product from "../moddle/Product.js"
import mongoose from "mongoose";
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
class ProductController {
//    📝  create
 static createProductItem =async(req,res)=>{
    const { title, desc, img_url,price,rating, category} = req.body
    if (title && category) {
        try {
       
        let titleInDb = await Product.findOne({ title })
        if (titleInDb) {
          return  res.status(400).json({ "msg": "Already exists!" })
        } else {
            const ProductItemData = new Product({
                title, desc, img_url,price,rating, category
            })
            const saveData = await ProductItemData.save()
            if (saveData) {
              return res.status(200).json({ "msg": "Created  successfully." })
            } else {
              return  res.status(400).json({ "msg": "Not created successfully." })

            }
        }

    } catch (error) {
      return  res.status(500).json({ "msg": "Internal server occured." })
            
    }
    } else {
      return  res.status(400).json({ "msg": "title and category  is required!" })
    }

 }
//  😘 get
 static getProductItem =async(req,res)=>{
try {
    const ProductItemData = await Product.find()
    if (ProductItemData) {
       return res.status(200).json({ "data": ProductItemData , "message":"Data fetched successfully"})
    } else {
      return  res.status(400).json({ "message": " Products  can not find" })
    }
} catch (error) {
   return  res.status(500).json({ "message": " Internal Server Error" ,error})
    
}
 }
 static getProductById=async(req,res)=>{
   try {
    const productId = req.params.id;
    const productItem = await Product.findById(productId);
    if (!productItem) {
      return res.status(404).json({ message: 'Product not found' });
    } 
    return res.status(200).json({ data: productItem, message: 'Product fetched successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
 }
//  update
 static updateProductItem =(req,res)=>{

 }
//  delete
 static deleteProductItem =(req,res)=>{

 }
 static addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate required fields
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ msg: "userId and at least one product are required." });
    }

    // Find the cart for the given userId
    let cart = await AddToCart.findOne({ userId });
// Helper function to calculate total price for an array of products
const getTotalPrice = (products) => {
  return products.reduce((total, product) => total + product.quantity * product.price, 0);
};
    if (cart) {
      // Update existing cart
      products.forEach((product) => {
        const targetObjectId = new  mongoose.Types.ObjectId(product.productId);
        const existingProductIndex = cart.products.findIndex((p) => p.productId.equals(targetObjectId));

        if (existingProductIndex > -1) {
          // Update quantity if product already exists in the cart
          cart.products[existingProductIndex].quantity += Number(product.quantity);
        } else {
          // Add new product to the cart
          cart.products.push({
            productId: new  mongoose.Types.ObjectId(product.productId),
            quantity: Number(product.quantity),
            price: Number(product.price),
          });
        }
      });

      // Calculate total price for all products in the cart
      cart.totalPrice = cart.products.reduce((total, product) => Number(total) + Number(product.quantity) * Number(product.price), 0);

      // Save the updated cart
      await cart.save();
    } else {
      // Create a new cart
      const newCart = new AddToCart({
        userId,
        totalPrice: getTotalPrice(products),
        products: products.map((product) => ({
          productId: new  mongoose.Types.ObjectId(product.productId),
          quantity: Number(product.quantity),
          price: Number(product.price),
        })),
      });
      await newCart.save();
      cart = newCart;
    }

   return  res.status(200).json(cart);
  } catch (err) {
    return  res.status(500).json({ msg: 'Error adding item to cart', err: err.message });
  }
};
static removeFromCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate required fields
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ msg: "userId and at least one product are required." });
    }

    // Find the cart for the given userId
    let cart = await AddToCart.findOne({ userId });

    // Helper function to calculate total price for an array of products
    const getTotalPrice = (products) => {
      return products.reduce((total, product) => total + product.quantity * product.price, 0);
    };

    if (cart) {
      // Update existing cart
      products.forEach((product) => {
        const targetObjectId = new mongoose.Types.ObjectId(product.productId);
        const existingProductIndex = cart.products.findIndex((p) => p.productId.equals(targetObjectId));

        if (existingProductIndex > -1) {
          // Update quantity if product already exists in the cart
          const currentQuantity = cart.products[existingProductIndex].quantity;
          const requestedQuantity = Number(product.quantity);

          if (currentQuantity > requestedQuantity) {
            // Decrease quantity if there's enough quantity
            cart.products[existingProductIndex].quantity -= requestedQuantity;
          } else if (currentQuantity === requestedQuantity) {
            // Remove the product if quantity becomes zero
            cart.products.splice(existingProductIndex, 1);
          } else {
            // Invalid request (trying to remove more than available quantity)
            return res.status(400).json({ msg: "Invalid quantity to remove." });
          }
        }
      });

      // Calculate total price for all products in the cart
      cart.totalPrice = getTotalPrice(cart.products);

      // Save the updated cart
      await cart.save();

      return res.status(200).json(cart);
    } else {
      return res.status(400).json({ msg: "There is no product; please add a new product." });
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Error while removing item from cart ', err: err.message });
  }
};
static clearCart = async(req, res)=>{
  try {
    const { userId } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ msg: "userId is required." });
    }

    // Find the cart for the given userId
    let cart = await AddToCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found for the given user." });
    }

    // Clear the cart (remove all products)
    cart.products = [];
    cart.totalPrice = 0;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ msg: "Cart cleared successfully.", cart });
  } catch (err) {
    return res.status(500).json({ msg: 'Error while clearing the cart', err: err.message });
  }
}

static getAddToCartProductsByUserId = async(req,res) =>{
  
  try {
    const userId = req.params.userId;
    // Find the cart for the given userId
    const cart = await AddToCart.findOne({ userId });
    if (cart) {
      // Extract productIds from the cart
      const productIds = cart.products.map((product) => product.productId);

      // Fetch product details for each productId
      const productsDetails = await Product.find({ _id: { $in: productIds } });
 // Calculate total quantity
 const totalQuantity = cart.products.reduce((total, product) => total + product.quantity, 0);
      // Combine product details with the cart data
      const cartWithDetails = {
        _id: cart._id,
        userId: cart.userId,
        totalPrice: cart.totalPrice,
        totalQuantity: totalQuantity,
        products: cart.products.map((cartProduct) => {
          const productDetail = productsDetails.find((detail) => detail._id.equals(cartProduct.productId));
          return {
            ...cartProduct.toObject(),
            details: productDetail,
          };
        }),
        __v: cart.__v,
      };

      return res.status(200).json({ data: cartWithDetails, message: 'Cart fetched successfully' });
    } else {
      return res.status(404).json({ message: 'Cart not found for the given user' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}


static payment = async (req, res)=>{
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripe = new Stripe(stripeSecretKey);
  try {
    console.log(req.body.token);
    const { token, amount } = req.body;
    const idempotencyKey = uuidv4();

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id // Assuming 'token' contains the payment method ID received from the client-side
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email
    }, { idempotencyKey });

  return  res.status(200).json(paymentIntent);
  } catch (error) {
    console.error(error);
   return  res.status(500).json({ message: 'An error occurred while processing the payment.',error:error.message });
  }
}

}
export default ProductController