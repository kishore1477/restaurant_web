import mongoose from "mongoose";
const AddToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalPrice: {
        type:  Number,   trim: true  },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type:  Number, required: true,    },
              
            price: { type: Number, required: true },
          
        }
    ],






});
const AddToCart = mongoose.model('AddToCart', AddToCartSchema);
export default AddToCart