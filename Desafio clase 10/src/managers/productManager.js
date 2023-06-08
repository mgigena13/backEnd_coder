import fs from 'fs';

const path = '../files/products.json';
const lastIdPath = '../files/lastid.txt';

export default class ProductManager {
    constructor() {
        this.lastId = 0;
    }

    getProducts = async() => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf8');
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    }

    createProduct = async(product) => {
        const products = await this.getProducts();
        await this.loadLastId();

        this.lastId++; // Incrementar el último código utilizado
        product.id = this.lastId; // Asignar el nuevo código al producto

        const existingProduct = products.some(p => p.code === product.code);

        if (existingProduct) {
            throw new Error("Error: el producto con ese código ya existe.")
        }

        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));

        await this.saveLastId();
        return { operacion: true, msj: "El producto ha sido agragado con éxito." }
    }

    loadLastId = async() => {
        if (fs.existsSync(lastIdPath)) {
            const data = await fs.promises.readFile(lastIdPath, 'utf8');
            this.lastId = parseInt(data) || 0;
        }
    }

    saveLastId = async() => {
        await fs.promises.writeFile(lastIdPath, this.lastId.toString());
    }

    deleteProduct = async(productId) => {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        products.splice(productIndex, 1);
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));

        return products;
    }

    getProductById = async(productId) => {
        const products = await this.getProducts();
        const product = products.find(p => p.id === productId);

        if (!product) {
            throw new Error("Producto no encontrado.");
        }

        return product;
    }

    updateProduct = async(productId, newData) => {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            throw new Error("El producto con el id especificado no existe.");
        }

        products[productIndex] = {...products[productIndex], ...newData };
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));

        return products[productIndex];
    }
}