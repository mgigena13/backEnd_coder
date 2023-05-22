import ProductManager from "./managers/productManager.js";

const productManager = new ProductManager();

const envio = async() => {
    let products = await productManager.getProducts();

    let product = {
        id: '',
        title: 'MEMORIA RAM DDR4 32GB 3200MHZ ADATA XPG D50',
        description: '32GB, CL 16-20-20, 3200MHz',
        price: 175779,
        thumbnail: 'https://www.venex.com.ar/products_images/1631807893_s56f4g.jpg',
        code: 'AX4U320032G16A',
        stock: 4
    }


    // Agrega producto
    try {
        await productManager.createProduct(product);
        //products = await productManager.getProducts();
        //console.log({product});
    } catch (error) {
        console.log(error);
    }


    /*
    //Eliminar producto
    try {
        await productManager.deleteProduct(2);
        products = await productManager.getProducts();
        console.log('El producto ha sido eliminado');
    } catch (error) {
        console.log(error.message);
    }
    */

    /*
        // busco producto por ID
        try {
            const productFound = await productManager.getProductById(11);
            console.log({ productFound });
        } catch (error) {
            console.log(error.message);
        }
    */
    /*
        // Actualizar producto por ID
        try {
            const productId = 3;
            const newProductData = { title: 'Samsung S23', price: 254 };
            const updatedProduct = await productManager.updateProduct(productId, newProductData);
            console.log({ updatedProduct });
        } catch (error) {
            console.log(error.message);
        }
    */
}

envio();