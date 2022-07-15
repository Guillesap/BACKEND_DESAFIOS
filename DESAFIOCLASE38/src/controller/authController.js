/*Controladores de rutas AUTH */

const userModel = require("../dao/models/userMongoose");
userModel;

const mailingService = require("../services/mailingService");
const passportLocal = require("../auth/authPassportLocal");
const passportFacebook = require("../auth/authPassportFacebook");

/*Controlador de Local-Passport */
exports.signUpLocal = passportLocal.authenticate("signup-local", {
  failureRedirect: "/failsignup",
});

exports.signUpLocalCallback = async (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["df2euol6wwi5u2ix@ethereal.email", process.env.GMAIL_USER],
    subject: `Nuevo usuario registrado: ${req.body.email} @ ${date} a las ${time}`,
    html: `El usuario ${req.body.email} se ha registrado el día ${date} a las ${time}. 
    Datos ingresados:
    - nombre ${req.body.name}
    - apellido ${req.body.lastname}
    - edad ${req.body.age}
    - número de contacto ${req.body.number}
    - dirección ${req.body.address}
    - email ${req.body.email}
    - avatar ${req.body.avatar}`,
    
    // Sirve para agregar archivos adjuntos
    // attachments: [
    //   {
    //     // filename and content type is derived from path
    //     path: req.session.passport.user.photo,
    //   },
    // ],
  };
  mailingService.mailingEthereal(mailOptions);
  mailingService.mailingGmail(mailOptions);

  res.redirect("/login");
};

exports.logIn = passportLocal.authenticate("local-login", {
  failureRedirect: "/faillogin",
});

exports.logInCallback = async (req, res, next) => {
  res.redirect("/welcome");
};


/*Controlador de Logeo de FACEBOOK */
exports.logInFacebook = async (req, res, next) => {
  passportFacebook.authenticate("facebook");
  res.redirect("/auth/facebook/callback");
};

exports.logInCallbackFacebook = async (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["df2euol6wwi5u2ix@ethereal.email", req.session.passport.user.email],
    subject: `El usuario ${req.session.passport.user.email} se LOGUEO el día ${date} a las ${time}`,
    html: `<h2>${req.session.passport.user.firstName} ${req.session.passport.user.lastName} se ha LOGUEADO el día ${date} a las ${time}</h2>`,
    attachments: [
      {
        // filename and content type is derived from path
        path: req.session.passport.user.photo,
      },
    ],
  };
  mailingService.mailingEthereal(mailOptions);
  mailingService.mailingGmail(mailOptions);
  res.redirect("/welcome");
};


/*Controlador de deslogeo */
exports.logOut = async (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["df2euol6wwi5u2ix@ethereal.email", req.session.passport.user.email],
    subject: `El usuario ${req.session.passport.user.email} se deslogueo el día ${date} a las ${time}`,
    html: `<h2>${req.session.passport.user.firstName} ${req.session.passport.user.lastName} se ha deslogueado el día ${date} a las ${time}</h2>`,
    attachments: [
      {
        // filename and content type is derived from path
        path: req.session.passport.user.photo,
      },
    ],
  };
  mailingService.mailingEthereal(mailOptions);
  mailingService.mailingGmail(mailOptions);
  req.session.destroy();
  res.clearCookie("isRegistered");
  res.redirect("/goodbye");
};
