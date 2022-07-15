// const { PORT } = require('./src/config/globals');
const { getConnection } = require("./src/dao/db/connectionMongo");
const http = require("./server.es6");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { PORT } = require("./src/config/globals");

/*En nuestra linea de comandamos tenemos
primer argumento: FORK o CLUSTER
segundo argument: port
tercer argumento: facebook client
cuarto argumento: facebook secret
*/

// getConnection()
//   .then((msg) => {
//     console.log(msg);
//     http.listen(PORT, () =>
//       console.log(`Working on ${PORT} and procces id ${process.pid}!`)
//     );
//   })
//   .catch((err) => console.log(err));



if (process.argv[2] === "cluster") {
  console.log("Servidor iniciado en modo CLUSTER");

  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(
        `Worker ${
          worker.process.pid
        } DIED at ${new Date().toLocaleDateString()}!`
      );
    });
  } else {
    getConnection()
      .then((msg) => {
        console.log(msg);
        http.listen(PORT, () =>
          console.log(`Working on ${PORT}! and procces id ${process.pid}`)
        );
      })
      .catch((err) => console.log(err));
  }
} else {
  console.log("Servidor iniciado en modo FORK");
  getConnection()
    .then((msg) => {
      console.log(msg);
      http.listen(PORT, () =>
        console.log(`Working on ${PORT} and procces id ${process.pid}!`)
      );
    })
    .catch((err) => console.log(err));
}
