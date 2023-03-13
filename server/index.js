import express from 'express'
import dotenv from 'dotenv'
 
const app = express()
dotenv.config()
 
import cors from 'cors'
import connectDb from './ConnectDb.js'
import ProductRouter from './routers/product_router.js'

const port = process.env.PORT
const dataBase_URL = process.env.DATABASE_URL
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use(express.json())

// DataBase Connection
connectDb(dataBase_URL)
app.use('/api/products',ProductRouter)
app.get('/', (req, res) => {
  res.send('Hello World! kishore kumar')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})