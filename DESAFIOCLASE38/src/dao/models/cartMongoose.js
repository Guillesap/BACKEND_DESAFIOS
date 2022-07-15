const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')
const {productSchema} = require('./productsMongoose');

const productOnCartSchema = new Schema({
  product: productSchema,
  quantity: {type: Number, default: 0}
})

// Estructura del documento en MongoDB a través de Mongoose
const cartSchema = new Schema({

  timestamp: {type: Date, default: new Date ()},
  /* COMO ESTÁ DEBAJO FUNCIONA, PERO FALTARIA LA CANTIDAD */
  // product: [productSchema]

  /*  PROBAMOS HACERLO ASI */
  productsOnCart: [productOnCartSchema]

});

const cartModel = model("Cart", cartSchema);

module.exports = {cartModel, cartSchema};
