const objectNumbers = {};

const generateRandomNumber = (cant) => {
  for (i = 1; i <= cant; i++) {
    let randomNumber = Math.floor(Math.random() * 1000 + 1);
    objectNumbers[randomNumber] =
      objectNumbers[randomNumber] == undefined
        ? 1
        : objectNumbers[randomNumber] + 1;
  }

  return objectNumbers;
};

module.exports = generateRandomNumber

/*CON FORK */
// process.on("message", (cant) => {
//   console.log(
//     `Ingresó a proceso hijo solicitando una cantidad de ${cant} numeros randoms`
//   );
//   const cantidadDeNumeros = parseInt(cant);
//   const result = generateRandomNumber(cantidadDeNumeros);
//   console.log(result);
//   process.send(result);
// });
