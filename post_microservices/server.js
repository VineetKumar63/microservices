import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import PostRouter from './routes/postRoutes.js';

const app = express();
const port = process.env.PORT || 5002

///////////middle ware//////////////
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5001'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.urlencoded({extended:false}))

app.use('/api',PostRouter)

app.listen(port,() =>{
    console.log("server is running.........")
})  