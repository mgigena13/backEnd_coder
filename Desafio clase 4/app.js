import ProductsManager from "./managers/productManager.js";

const productsManager = new ProductsManager();

const envio = async() => {
    let productos = await productsManager.getProductos();
    //console.log({ productos });

    let producto = {
        id: '',
        titulo: 'Telefono Samsung S23 Ultra 256gs',
        descripcion: 'Telefono de alta gama',
        precio: 415885,
        thumbnail: 'sin imagen',
        code: 'CEL254',
        stock: 25
    }

    /*
        // Agrega producto
        await productsManager.crearProducto(producto);
        productos = await productsManager.getProductos();
        console.log({ productos });
    */
    /*
        //Eliminar producto
        try {
            await productsManager.deleteProducto(2);
            productos = await productsManager.getProductos();
            console.log('El producto ha sido eliminado');
        } catch (error) {
            console.log(error.message);
        }
    */
    /*
        // busco producto por ID
        try {
            const productoEncontrado = await productsManager.getProductById(3);
            console.log({ productoEncontrado });
        } catch (error) {
            console.log(error.message);
        }
        */

    // Actualizar producto por ID
    try {

        const idProducto = 3;
        const nuevosDatos = { titulo: 'Otro telefono', precio: 254 };
        const productoActualizado = await productsManager.updateProducto(idProducto, nuevosDatos);
        console.log({ productoActualizado });
    } catch (error) {
        console.log(error.message);
    }

}

envio();