import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouter from './Routes/UserRoute.js'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/user",UserRouter);
mongoose.connect("mongodb+srv://bholavishwakarma:RvbShsPFoHXS8Fqn@cluster0.sjfb1gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to MongoDB");
    app.listen(3001,()=>{
        console.log("Server started...")
    })
}).catch(err=>{
    console.log(err);
});