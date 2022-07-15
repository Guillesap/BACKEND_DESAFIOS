/*Cart en MongoDB */
const { cartModel } = require("../dao/models/cartMongoose");

/*Cart en memoria */
const { CartJS } = require("../dao/models/cartJs");
const cartJs = new CartJS();

module.exports = class {
  async createCart(cart) {
    console.log("Ingresó a cartService => createCart");
    await cartJs.createCart(cart);
    return await cartModel.create(cart);
  }

  async getAllCarts() {
    console.log("Ingresó a cartService => getAllCarts");
    await console.log(cartJs.showCarts());
    return await cartModel.find();
  }

  async getProductOnCart(idCart) {
    console.log("Ingresó a cartService => getProductOnCart");
    return await cartModel.findById(idCart);
  }

  async deleteProductOnCart({ idCart, idProduct }) {
    console.log("Ingresó a cartService => deleteProductOnCart");
    return await cartModel.findOneAndUpdate(
      { _id: idCart },
      { $pull: { product: { code: idProduct } } }
    );
  }
};
