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

const productRoute = require("./route/productRoute");

app.use(cors());

app.use(upload());

app.use(express.json());

app.use(productRoute)

app.get('/favicon.ico', (req, res) => res.status(204));

module.exports = app