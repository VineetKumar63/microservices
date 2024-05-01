import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import AuthRoute from './routes/AuthRoter.js';

const app = express();
const port = process.env.PORT || 5001

///////////middle ware//////////////
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5001'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.urlencoded({extended:false}))

import mongoose from 'mongoose'
import UserRoute from './routes/userRouter.js';

// Database configuration
const dbConfig = {
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/auth_microservices'
};

// Connect to MongoDB
mongoose.connect(dbConfig.url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api',AuthRoute)
app.use('/api/', UserRoute)

app.get('/', (req, res)=> {
    return res.send({message:"  working"})
});
app.listen(port,() =>{
    console.log("server is running.........")
})