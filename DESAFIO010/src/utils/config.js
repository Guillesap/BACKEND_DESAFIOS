import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    sqlite3: {
        client: 'better-sqlite3',
        connection: { filename: path.resolve(__dirname, '../db/ecommerce.db3') },
        useNullAsDefault: true
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'baseterror'
        }
    },
    mongodb: {
        url: 'mongodb+srv://guillesapag:mercyful69@cluster0.eh9yf.mongodb.net/baseterror?retryWrites=true&w=majority',
    },
    fileName: {
        messages: path.resolve(__dirname, '../data/messages.txt')
    }
}

export default config;
