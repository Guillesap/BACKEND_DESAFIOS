const CartService = require("../services/cartService");
const ProductService = require("../services/productService");
const UserServices = require("../services/userService");
const cart = new CartService();
const product = new ProductService();
const user = new UserServices();

const CartSessionService = require("../services/cartSession");
const cartSession = new CartSessionService();

const mailingService = require("../services/mailingService");
const createHtml = require("../utils/ticketHTML");

const whatsAppTwilio = require("../services/twilio.whatsapp");

const smsTwilio = require("../sms/twilio");

exports.postCartSession = async (req, res, next) => {
  const response = cartSession.addProductsToSession(req.body, req.session);
  res.redirect("/api/cart/get-session");
};

exports.getCartSession = async (req, res, next) => {
  const response = cartSession.getProductsFromSession(req.session.cartSession);
  // res.json(response);
  res.render("./pages/checkout-cart", { response });
};

exports.createCart = async (req, res, next) => {
  console.log("Entró a cartController => createCart");
  try {
    const cartBody = req.session.cartSession;
    const finalCart = {
      productsOnCart: [],
    };

    for (i = 0; i < cartBody.length; i++) {
      let productFinded = await product.getProduct(cartBody[i].id);
      finalCart.productsOnCart.push({
        product: productFinded,
        quantity: cartBody[i].quantity,
      });
    }
    const cartCreated = await cart.createCart(finalCart);

    const idUser = { _id: req.session.passport.user._id };
    console.log("Esto tiene idUser");
    console.log(idUser);

    const cartAddToUser = await user.addCartToUser(idUser, finalCart);

    const emailSubject = `Nuevo pedido de: ${req.session.passport.user.name} @ mail: ${req.session.passport.user.email}`;
    const emailBody = createHtml.createHtml(cartCreated);

    await mailingService.mailingGmail({
      from: "Servidor de Node.js",
      to: ["df2euol6wwi5u2ix@ethereal.email", process.env.GMAIL_USER],
      subject: emailSubject,
      html: emailBody,
    });
    await whatsAppTwilio(emailSubject, req.session.passport.user.number);
    await smsTwilio(
      req.session.passport.user.number,
      "Hemos recibido su pedido de películas y se encuentra en proceso"
    );

    delete req.session.cartSession;

    res.render("./pages/welcome");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getProductOnCart = async (req, res, next) => {
  console.log("Entró a cartController => getProductOnCart");
  try {
    const idCart = req.query.idCart;
    const idProduct = req.query.idProduct;
    const productsOnCart = await cart.getProductOnCart(idCart);
    if (idProduct) {
      const productFinded = productsOnCart.product.find(
        (product) => product.code == idProduct
      );
      res.json(productFinded);
    } else {
      res.json(productsOnCart);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.deleteProductOnCart = async (req, res, next) => {
  console.log("Entró a cartController => deleteProductOnCart");
  try {
    const idCartQuery = req.query.idCart;
    const idProductQuery = req.query.idProduct;
    const productToBeDeletedOnCart = {
      idCart: idCartQuery,
      idProduct: idProductQuery,
    };
    const productsOnCart = await cart.deleteProductOnCart(
      productToBeDeletedOnCart
    );
    res.json(productsOnCart);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getAllCarts = async (req, res, next) => {
  try {
    const carts = await cart.getAllCarts();
    res.json(carts);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
