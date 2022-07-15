import dotenv from 'dotenv';
dotenv.config();

const venvs = {
  MONGO_CONNECTION_STRING: 'mongodb+srv://guillesapag:mercyful69@cluster0.eh9yf.mongodb.net/baseterror?retryWrites=true&w=majority',
  PORT: process.env.PORT || 8080,
};

export default venvs;
