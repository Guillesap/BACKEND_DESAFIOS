/*Requiero controladores de messages */
const messagesController = require('../controller/messagesChat');
module.exports = (router) => {
    router
        .get("/api/message/list", messagesController.getAllMsgChat)
        .post("/api/message/create", messagesController.createMsg)
    return router   
}