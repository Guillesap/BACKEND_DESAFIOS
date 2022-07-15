/*Mongoose para chats */
const messagesChat = require("../dao/models/messagesMongoose");
/*Deberia tratar de requerirlo desde servicios */

/*Servicio de sms */
const twilio = require("../sms/twilio");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    /*Traigo todos los mensajes */
    try {
      const allMsgChat = await messagesChat.find();
      socket.emit("list-msg-chat", allMsgChat);
    } catch (error) {
      console.log(error);
    }

    socket.on("msg-chat", async (data) => {
      try {
        if (data.text.includes("administrador")) {
          twilio(data.author.id, data.text);
        }
        await messagesChat.create(data);
      } catch (error) {
        console.log(error);
      }

      try {
        const allMsgChat = await messagesChat.find();
        io.emit("list-msg-chat", allMsgChat);
      } catch (error) {
        console.log(error);
      }
    });

    /*Evento desconectar */
    socket.on("disconnect", () => {
      console.log(`El usuario ${socket.id} se desconectó`);
    });
  });

  return io;
};
