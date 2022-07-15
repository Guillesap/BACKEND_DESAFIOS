const randomNumberController = require("../controller/randomNumberController")

module.exports = (router) => {
  router.get("/randoms", randomNumberController);
  return router;
};
