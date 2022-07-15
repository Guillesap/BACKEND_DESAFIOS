import express from 'express';
import path from 'path';
import * as http from 'http';
import { engine } from 'express-handlebars';

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const layoutDirPath = path.resolve(__dirname, '../../views/layouts');

const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layouts/index.hbs'
);

const partialDirPath = path.resolve(__dirname, '../../views/partials');


app.set('view engine', 'hbs');



app.engine(
  'hbs',
  engine({
    layoutsDir: layoutDirPath, 
    extname: 'hbs', 
    defaultLayout: defaultLayerPth, 
    partialsDir: partialDirPath,
  })
);

app.get('/', async (req, res) => {
  res.render('main');
});

const myServer = new http.Server(app);

export default myServer;
