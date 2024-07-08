import { promises as fs } from 'fs';
import __dirname from '../utils.js'


class ProductManager {
    constructor(filePath) {
        this.filePath = `${__dirname}/../src/data/products.json`;
        this.products = [];
        this.lastId = 0;
        this.loadProductsFromFile();
    }

    async loadProductsFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.lastId = this.products[this.products.length - 1].id;
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.filePath, '[]');
                this.products = [];
                console.log('The file products.json has been created.');
            } else {
                throw error;
            }
        }
    }

    async saveProductsToFile() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.filePath, data);
        } catch (error) {
            throw error;
        }
    }

    async addProduct(title, description, code, price, stock, category, thumbnails) {
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("All fields are mandatory, except thumbnails.");
        }

        const newProduct = {
            id: ++this.lastId,
            title,
            description,
            price,
            thumbnails,
            code,
            category,
            stock,
            status: true

        };

        this.products.push(newProduct);
        await this.saveProductsToFile();
        return newProduct;
    }

    async getProducts() {
        return [...this.products];
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error(`Product not found. Invalid id: ${id}`);
        }
        return { ...product };
    }

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error(`Product not found. Invalid id: ${id}`);
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        await this.saveProductsToFile();
        return { ...this.products[productIndex] };
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error(`Product not found. Invalid id: ${id}`);
        }

        this.products.splice(productIndex, 1);
        await this.saveProductsToFile();
    }
}

export default ProductManager;
