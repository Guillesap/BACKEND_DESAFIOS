/*Base de Datos MongoDB */
const { productModel } = require("../dao/models/productsMongoose");

/*Persistencia en Memoria */
const { ProductJS } = require("../dao/models/productsJs");
const productJS = new ProductJS();

module.exports = class {
  async createProduct(product) {
    console.log("Ingresó a productService => createProduct");
    console.log(product);
    productJS.createProduct(product);
    return await productModel.create(product);
  }

  async getProduct(id) {
    console.log("Ingresó a productService => getProduct");
    return await productModel.findById(id);
  }

  async getAllProducts() {
    return await productModel.find().lean();
  }

  async updateProduct(id, productUpdated) {
    console.log("Ingresó a productService => updateProduct");
    const productToUpdate = await productModel.findByIdAndUpdate(
      id,
      productUpdated,
      {
        new: true,
      }
    );
    return productToUpdate;
  }

  async deleteProduct(id) {
    console.log("Ingresó a productService => deleteProduct");
    await productModel.findByIdAndDelete(id);
  }

  async getProductByTitle(title) {
    console.log("Ingresó a productService => getProductByTitle");
    return await productModel.find({ title: title });
  }

  async getProductByCode(code) {
    console.log("Ingresó a productService => getProductByCode");
    return await productModel.find({ code: code });
  }

  async getProductByPrice(pricemin, pricemax) {
    return await productModel
      .find({
        $and: [{ price: { $gte: pricemin } }, { price: { $lte: pricemax } }],
      })
      .lean();
  }

  async getProductByStock(stockmin, stockmax) {
    console.log("Ingresó a productService => getProductByStock");
    return await productModel.find({
      $and: [{ stock: { $gte: stockmin } }, { stock: { $lte: stockmax } }],
    });
  }
};
