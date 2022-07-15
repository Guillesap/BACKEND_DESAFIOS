/*Base de Datos MongoDB */
const userModel = require("../dao/models/userMongoose");

module.exports = class {
  async addCartToUser(id, cart) {
    await userModel.updateOne(id, {
      $push: { carts: cart },
    });
  }
};
