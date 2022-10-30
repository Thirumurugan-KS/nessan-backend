const { Router } = require("express");
const { getAllProducts , getIndividProduct, deleteIndividProduct, insertIndividProduct } = require("../controller/productController");

const productRoute = Router();

productRoute.get("/", getAllProducts);

productRoute.get("/product/:pid", getIndividProduct);

productRoute.delete("/product/:pid", deleteIndividProduct);


productRoute.post('/product/insert', insertIndividProduct);

module.exports = productRoute