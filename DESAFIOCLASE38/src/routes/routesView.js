/*Requiero controladores de productos */
const ProductService = require("../services/productService");
const product = new ProductService();

/*Controladores de Auth */
const { checkAuthentication } = require("../auth/checkAuth");

/*Controladores de Productos */
const productController = require("../controller/product");

/*Controladores de Mensajes de chat */
const chatController = require("../controller/messagesChat");

/*Controlador carrito */
const cartController = require("../controller/cartController");

/*Controlador signup*/
const signUpController = require("../controller/signupController");

module.exports = (router) => {
  router
    /*Ruta por defecto si no está logueado */
    .get("/", checkAuthentication, (req, res, next) => {
      res.render("./pages/login");
    })

    /*Vistas de productos */
    .get("/productos/vista", checkAuthentication, productController.findAll)
    .get("/productos/agregar", (req, res, next) => {
      res.render("./pages/agregar");
    })

    /*Vistas de busquedad de productos por precio */
    .get("/buscar/precio?", checkAuthentication, productController.getByPrice)

    /*Vistas de carrito */
    .get("/carrito/vista", checkAuthentication, cartController.getCartSession)
    .get("/purchase-completed", (req, res, next) => {
      res.render("./pages/purchase-completed");
    })

    /*Vistas de chat */
    .get("/chat-view", checkAuthentication, chatController.getAllMsgChat)

    /*Vistas de autenticación */
    .get("/login", (req, res, next) => {
      res.render("./pages/login");
    })
    .get("/signup", signUpController.signUp)

    /*Vistas de perfil y goodbye */
    .get("/welcome", checkAuthentication, (req, res, next) => {
      const data = req.session.passport;
      res.render("./pages/welcome", { data });
    })
    .get("/goodbye", (req, res, next) => {
      res.render("./pages/goodbye");
    })

    /*Vista de errores */
    .get("/error-login", (req, res, next) => {
      res.render("./pages/error-login");
    })
    .get("/error-signup", (req, res, next) => {
      res.render("./pages/error-signup");
    });
  return router;
};
