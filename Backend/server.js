import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectClodinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectClodinary();


// middlewares
app.use(express.json());    //any request is passed from this middleware
app.use(cors());    // middleware to connect frontend and backend

//Initializing routes
app.use("/api/song",songRouter);
app.use('/api/album',albumRouter)

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>console.log(`server started on ${port}`))