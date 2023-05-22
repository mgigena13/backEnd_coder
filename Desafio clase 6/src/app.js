import express from 'express';
import ProductManager from "../managers/productManager.js";
const app = express();
const productManager = new ProductManager();

app.get('/products', async(req, res) => {
    let products = await productManager.getProducts();
    let limit = req.query.limit
    if (limit != 'undefined') {
        products = products.slice(0, limit);
    }
    res.send(products)
});

app.get('/products/:id', async(req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await productManager.getProductById(productId);
        res.send(product);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});

app.listen(8080, () => {
    console.log('servidor express puerto 8080');
});