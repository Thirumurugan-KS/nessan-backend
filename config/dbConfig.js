const mongoose = require('mongoose');

require("dotenv").config()

exports.connectDb = async() =>{
    try {
        await mongoose.connect( process.env.MONGODB , ()=> {
            console.log("DB connected");
        });
    } catch (error) {
    
        console.log(error);
    }
}


