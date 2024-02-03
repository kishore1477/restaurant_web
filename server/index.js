import express from 'express'
import dotenv from 'dotenv'
 
const app = express()
dotenv.config()
 
import cors from 'cors'
import connectDb from './ConnectDb.js'
import ProductRouter from './routers/product_router.js'
import Authrouter from './routers/authRouter.js'

const port = process.env.PORT ||  8000 
const dataBase_URL = process.env.DATABASE_URL
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use(express.json())

app.use('/api/auth',Authrouter)
app.use('/api/products',ProductRouter)
app.get('/', (req, res) => {
  res.send('Hello World! kishore kumar')
})


//Connect to the database before listening
connectDb(dataBase_URL).then(() => {
  app.listen(port, () => {
      console.log("listening for requests");
  })
})