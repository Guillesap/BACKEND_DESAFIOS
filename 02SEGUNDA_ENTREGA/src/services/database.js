import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://guillesapag:mercyful69@cluster0.eh9yf.mongodb.net/basepeliculasterror?retryWrites=true&w=majority' //colocarlo en .env  gitignore

export const initMongoDB = async () => {
  try {
    console.log(' PROCESO DE CONECCION A MI BASE DE DATOS');
    console.log(connectionString)
    await mongoose.connect(connectionString);

    console.log('CONECCION EFECTUADA CORRECTAMENTE');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
