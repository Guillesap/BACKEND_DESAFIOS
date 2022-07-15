const { processInfo } = require("../utils/processInfo");

module.exports = (router) => {
  router.get("/info", (req, res, next) => {
    // console.log(processInfo);
    res.send(processInfo);
  });

  return router;
};