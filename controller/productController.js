const products = require("../models/productModel");

exports.getAllProducts = async(req,res)=>{

    const productsData = await products.find();

    if(productsData){
        res.status(200);
        res.send(productsData)
    }    
};

exports.getIndividProduct =  async(req,res)=> {

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
};

exports.deleteIndividProduct =  async(req,res)=>{
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
};


exports.insertIndividProduct =  async(req,res)=>{
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
}