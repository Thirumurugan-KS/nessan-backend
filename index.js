const app = require("./app");
const { connectDb } = require("./config/dbConfig");
require("dotenv").config()

connectDb();

app.listen(process.env.PORT || 5000 , ()=>{
    console.log("Server is up and running");
})