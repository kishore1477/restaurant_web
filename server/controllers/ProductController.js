import Product from "../moddle/Product.js"

class ProductController {
//    📝  create
 static createProductItem =async(req,res)=>{
    console.log("body data is", req.body)
    const { title, desc, img_url,price,rating, category} = req.body
    console.log("body data..", title, desc, img_url,price,rating, category)
    if (title && category) {
        try {
       
        let titleInDb = await Product.findOne({ title })
        if (titleInDb) {
            res.status(400).json({ "msg": "Already exists!" })
        } else {
            const ProductItemData = new Product({
                title, desc, img_url,price,rating, category
            })
            const saveData = await ProductItemData.save()
            if (saveData) {
                res.status(200).json({ "msg": "Created  successfully." })
            } else {
                res.status(400).json({ "msg": "Not created successfully." })

            }
        }

    } catch (error) {
        res.status(500).json({ "msg": "Internal server occured." })
            
    }
    } else {
        res.status(400).json({ "msg": "title and category  is required!" })
    }

 }
//  😘 get
 static getProductItem =async(req,res)=>{
try {
    const ProductItemData = await Product.find()
    if (ProductItemData) {
        res.status(200).json({ "data": ProductItemData })
    } else {
        res.status(400).json({ "msg": " Products  can not find" })
    }
} catch (error) {
    res.status(500).json({ "msg": " Internal Server Error" })
    
}
 }
//  update
 static updateProductItem =(req,res)=>{

 }
//  delete
 static deleteProductItem =(req,res)=>{

 }

}
export default ProductController