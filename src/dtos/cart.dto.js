export default class CartDTO {
    constructor({ id, products }) {
        if (id) this.id = id;
        this.products = products || [];
    }
}
