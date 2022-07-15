const renderChat = require('../controller/messagesChat');

module.exports = (router) => {
    router
        .get('/chat-io', renderChat.getAllMsgChat);

    return router
}