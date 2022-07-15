const MessagesChatService = require("../services/messagesChat");
const messageChat = new MessagesChatService();
const util = require("util");

const { normalize, schema } = require("normalizr");

exports.createMsg = async (req, res, next) => {
  console.log("Controller => messagesChat => createMsg");

  try {
    const msgCreated = await messageChat.createMessage(req.body);
    res.json({ msg: "Message Chat created!", messageChat: msgCreated });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getAllMsgChat = async (req, res, next) => {
  console.log("Controller => messagesChat => getAllMsgChat");

  try {
    const allMsgChat = await messageChat.getAllMessage();

    const historyChat = { id: 1, content: allMsgChat };

    const userSchema = new schema.Entity("author");

    /* Con este esquema con este atributo id lo que hace es crear la entidad author, donde cada autor el ID es su ALIAS: 

     const userSchema = new schema.Entity('authors',{}, {idAttribute: (value) => value.alias});

     pero si no le colocamos nada lo que hace es leer por defecto dentro de author (consignado en el entry schema "author:userSchema") la propiedad ID, que en nuestra DB es el mail. 

    */

    const entrySchema = new schema.Entity(
      "entries",
      {
        author: userSchema,
      },
      { idAttribute: (value) => value._id.toString() }
    ); /*Este es el ID del mensaje de chat */

    const chatSchema = new schema.Entity("chat", {
      content: [entrySchema],
    });

    const normalizedChat = normalize(historyChat, chatSchema);

    console.log(JSON.stringify(allMsgChat).length);
    console.log(JSON.stringify(normalizedChat).length);

    //Sirve para cuando hay renderizado del lado del servidor
    // res.json(normalizedChat)

    //Sirve para la petición HTTP
    // console.log(allMsgChat);
    // res.render("./pages/chat", { allMsgChat });

    // Sirve para SocketIo
    res.render("./pages/chat");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
