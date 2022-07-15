module.exports = class {
  addProductsToSession = (cart, session) => {
    if (!session.cartSession) {
      session.cartSession = cart;
      return session.cartSession;
    } else {
      session.cartSession = [...session.cartSession, ...cart];
      return session.cartSession;
    }
  };

  getProductsFromSession = (productsOnCart) => {
    if (!productsOnCart) {
      return "No hay productos";
    } else {
      return productsOnCart;
    }
  };
};
