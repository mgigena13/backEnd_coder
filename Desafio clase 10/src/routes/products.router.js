import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager();
const router = Router();

router.get('/', async(req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();
        const limitProd = limit >= 0 ? limit : products.length;
        res.send(products.slice(0, limitProd));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

export default router;