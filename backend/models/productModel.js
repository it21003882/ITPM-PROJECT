import mongoose from 'mongoose'

const productSchema = mongoose.Schema({

   
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
   
}, {
    timestamps: true
})

const Product = mongoose.model('product', productSchema)
 
export default Product
