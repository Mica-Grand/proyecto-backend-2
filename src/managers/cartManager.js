import { promises as fs } from 'fs';
import __dirname from '../utils.js'


class CartManager {
    constructor() {
        this.filePath = `${__dirname}/../src/data/carts.json`;
        this.carts = [];
        this.lastId = 0;
        this.initialize();
    }

    async loadCartsFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.carts = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.carts = [];
                await this.saveCartsToFile();
                console.log('The file carts.json has been created.');
                return;
            }
            console.error('Error loading carts from file:', error);
        }
    }
    async initialize() {
        try {
            await this.loadCartsFromFile();
            if (this.carts.length > 0) {
               this.lastId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.error('Error initializing CartManager:', error);
        }
    }

    async saveCartsToFile() {
        try {
            const data = JSON.stringify(this.carts, null, 2);
            await fs.writeFile(this.filePath, data);
        } catch (error) {
            console.error('Error saving carts to file:', error);
        }
    }

    async createCart() {
        const newCart = {
            id: ++this.lastId,
            products: []
        };

        this.carts.push(newCart);

        await this.saveCartsToFile();
        return newCart;
    }

    async getCartById(id) {
        await this.loadCartsFromFile();
        const cart = this.carts.find(cart => cart.id === id);
        return cart;
    }

    async addProductToCart(cartId, productId, quantity) {
        await this.loadCartsFromFile();
        const cart = this.carts.find(cart => cart.id === cartId);

        if (!cart) {
            console.error(`Cart with ID ${cartId} not found.`);
            return false;
        }

        const productToAdd = { productId, quantity };
        const existingProductIndex = cart.products.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push(productToAdd);
        }

        await this.saveCartsToFile();
        return true;
    }
}

export default CartManager;