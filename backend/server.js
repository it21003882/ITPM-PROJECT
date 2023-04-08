import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import cors from 'cors'
import path from 'path'

//routes
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()

//connect database
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())

//calling routes
app.use('/api/users', userRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/orders', orderRoutes)

const __dirname = path.resolve()
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use('/api/products', productRoutes)

//paypal id connect
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

//create port
const PORT = process.env.PORT || 6500

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
  )
)
