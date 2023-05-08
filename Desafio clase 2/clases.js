class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 0;
    }

    getProducts() {
        return this.products;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        // Verifico si el codigo del producto existe
        if (this.products.some(product => product.code === code)) {
            throw new Error(`El producto con el código ${code} ya existe.`);
        }

        // Incremento el contador de id
        this.productIdCounter++;

        // Create new product object
        const newProduct = {
            id: this.productIdCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        // Agrego el nuevo producto al array
        this.products.push(newProduct);

        // Retorno nuevo producto creado
        return newProduct;
    }

    getProductById(id) {
        // Buscar producto con ID coincidente
        const product = this.products.find(product => product.id === id);

        // Tira error si no se encuentra el producto
        if (!product) {
            throw new Error(`Producto con ID ${id} no encontrado.`);
        }

        // retorna el array de productos
        return product;
    }
}

// Crear una instancia de la clase ProductManager
const productManager = new ProductManager();

// Llamar al método getProducts, que debe devolver un arreglo vacío
console.log("metodo Get vacio", productManager.getProducts()); // []

// Llamar al método addProduct para agregar un nuevo producto
const newProduct = productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
});
console.log({ newProduct }); // { id: 1, title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 }

// Llamar al método getProducts nuevamente, que debe mostrar el producto recién agregado
console.log("metodo get", productManager.getProducts()); // [ { id: 1, title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 } ]

// Llamar al método addProduct nuevamente con el mismo código, lo que debería arrojar un error
try {
    productManager.addProduct({
        title: "otro producto",
        description: "Este es otro producto",
        price: 150,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 10,
    });
} catch (error) {
    console.log("ERROR", error.message);
}

// Llamar al método getProductById con un ID existente, lo que debería devolver el producto correspondiente
console.log("Get by ID", productManager.getProductById(1)); // { id: 1, title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 }

// Llamar al método getProductById con un ID no existente, lo que debería arrojar un error
try {
    productManager.getProductById(2);
} catch (error) {
    console.log(error.message); // "Producto con ID 2 no encontrado."
}