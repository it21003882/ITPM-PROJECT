import express from 'express'
const  router = express.Router()
import { getProductbyID, getProducts } from '../controllers/productController.js'



router.get('/:id', getProductbyID)
router.get('/', getProducts)


export default router 