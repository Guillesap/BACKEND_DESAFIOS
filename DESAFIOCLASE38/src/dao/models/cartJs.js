class CartJS {

    listOfCarts = []

    createCart = (cart) => {
        return this.listOfCarts.push(cart);
    }

    showCarts = () => {
        return this.listOfCarts;
    }

}

module.exports = { CartJS }