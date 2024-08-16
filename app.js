import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouter from './Routes/UserRoute.js';
import SupplierRouter from './Routes/SupplierRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/user",UserRouter);
app.use("/supplier",SupplierRouter)

const link = process.env.CONNECTION_LINK;
mongoose.connect(link).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(3001,()=>{
        console.log("Server started...")
    })
}).catch(err=>{
    console.log(err);
});