const express = require("express");
const cors = require("cors");
const cloudinary = require('cloudinary');
const upload = require('express-fileupload');
require("dotenv").config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET,
    secure: true
  });

const app = express();

const products = require("./models/productModel");

app.use(cors());

app.use(upload());

app.use(express.json())

app.get("/", async(req,res)=>{

    const productsData = await products.find();

    if(productsData){
        res.status(200);
        res.send(productsData)
    }    
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/product/:pid", async(req,res)=> {

    try {
        const {pid} = req.params

    if(pid){
        const productsData = await products.findById(pid);

    if(productsData){
        res.status(200);
        res.send(productsData)
    }
    else {
        res.status(400);
        res.send("No data found");
    }
    }  
    } catch (error) {
        res.status(400);
        res.send("No data found");
        
    }
});

app.delete("/product/:pid", async(req,res)=>{
    try {
        const {pid} = req.params

    if(pid){
        const productsData = await products.findByIdAndDelete(pid);

        res.send("Data deleted");
    }  
    } catch (error) {
        res.status(400);
        res.send("No data found");
        
    }
});


app.post('/product/insert', async(req,res)=>{
    try {

        const {image} = req.files;

        const path = __dirname + "/files/" + image.name;
    
        image.mv(path)

        const { name , description , price} = req.body

        if(name && description && price && image) {

            let cloudData = await cloudinary.v2.uploader.upload(path)

            const productsData = await products.create({name,description,price});

            productsData.url = cloudData.url;

            await productsData.save();

            if(productsData){
                res.status(200);
                res.send("Data inserted");
            }
        }
        else {
            res.status(400);
            res.send("Need all the data");
        }
        
    } catch (error) {
        res.status(400);
        res.send("Error");
    }
})

module.exports = app