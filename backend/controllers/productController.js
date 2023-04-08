import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'



//retrive product items
const getProducts = asyncHandler(async (req, res) => {
  const food = await Product.find({})
  res.json(food)
})


//retrive product items by ID
const getProductbyID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,

    })
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})


export { getProductbyID, getProducts }