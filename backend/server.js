// const express = require('express'); #traditional way
import express from 'express';
import dotenv from "dotenv";
import { connecDB } from './config/db.js';
import Product from './models/product.js';

dotenv.config();

const app = express();

app.use(express.json())// allows us to accept json data in req.body

app.post("/api/products",async(req,res)=>{
    const product = req.body; // user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    }
    catch(error){
        console.error("Error in creating product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
});

app.delete("/api/products/:id",async(req,res)=>{
    const {id} = req.params
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true,message:"Product deleted"});
    }
    catch(error){
        res.status(404).json({success:false,message:"Product not found"})
    }
})

// app.get("/",(req,res)=>{
//     res.send("working");
// });

// console.log(process.env.MONGO_URI)

app.listen(5000,()=>{
    connecDB();
    console.log("server started at http://localhost:5000");
})

// fEYAEQCRlJQaFQU6