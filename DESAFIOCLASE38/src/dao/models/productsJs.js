class ProductJS {

    listOfProducts = []

    createProduct = (product) => {
        return this.listOfProducts.push(product);
    }

    showProducts = () => {
        return this.listOfProducts;
    }

}

module.exports = { ProductJS }