/*Requiero controladores de productos */
const cartController = require("../controller/cartController");

module.exports = (router) => {
  router
    .get("/api/cart/", cartController.getAllCarts)
    .post("/api/cart/create", cartController.createCart)
    .post("/api/cart/post-session", cartController.postCartSession)
    .get("/api/cart/get-session", cartController.getCartSession)
    .get("/api/cart/search", cartController.getProductOnCart)
    .delete("/api/cart/delete/search", cartController.deleteProductOnCart)
    .post('/api/cart/test', (req,res,next) => {
      console.log(req.body)
    })
  return router;
};
