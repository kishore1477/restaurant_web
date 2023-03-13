import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim:true
    },
       desc: {
        type:String,
         
         trim:true
    },
    category: {
        type:String,
        required: true,
        trim:true
         
    },
   img_url: {
        type:String,
        required: true,
         trim:true
    },
   price: {
        type:Number,
        required: true,
         trim:true
    },
    
    rating: {
        type:String,
        trim:true
    },
 
  
 
  });
  const Product = mongoose.model('Product', ProductSchema);
  export default Product