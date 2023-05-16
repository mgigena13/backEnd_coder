import fs from 'fs';

const path = './files/products.json';
const lastIdPath = './files/lastid.txt';

export default class ProductsManager {
    getProductos = async() => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf8');
            const productos = JSON.parse(data);
            return productos;
        } else {
            return [];
        }
    }
    crearProducto = async(producto) => {
        const productos = await this.getProductos();
        await this.loadlastId();

        this.lastId++; // Incrementar el último código utilizado
        producto.id = this.lastId; // Asignar el nuevo código al producto

        const existeProducto = productos.some(p => p.id === producto.id);
        if (existeProducto) {
            console.log("Error, el producto con ese código ya existe");
            return;
        }

        productos.push(producto);
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));

        await this.savelastId();
    }

    loadlastId = async() => {
        if (fs.existsSync(lastIdPath)) {
            const data = await fs.promises.readFile(lastIdPath, 'utf8');
            this.lastId = parseInt(data) || 0;
        }
    }

    savelastId = async() => {
        await fs.promises.writeFile(lastIdPath, this.lastId.toString());
    }

    deleteProducto = async(pid) => {
        const productos = await this.getProductos();
        const productoIndex = productos.findIndex(p => p.id === pid);

        if (productoIndex === -1) {
            throw new Error(`Producto no encontrado.`);
        }
        productos.splice(productoIndex, 1)
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t')); //vuelvo a guardar

        return productos;
    }

    getProductById = async(id) => {
        const productos = await this.getProductos();
        const producto = productos.find(p => p.id === id);

        if (!producto) {
            throw new Error(`Producto no encontrado.`);
        }

        return producto;
    }

    updateProducto = async(pid, newData) => {
        const productos = await this.getProductos();
        const productoIndex = productos.findIndex(p => p.id === pid);

        if (productoIndex === -1) {
            throw new Error(`El producto con el id especificado no existe..`);
        }
        productos[productoIndex] = {...productos[productoIndex], ...newData };
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
        return productos[productoIndex];
    }
}