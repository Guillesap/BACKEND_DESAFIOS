import express from 'express';
import mainRouter from '../routes/index';
import http from 'http';

const app = express();

app.use(express.json());

app.use('/api', mainRouter);

app.use(function (err, req, res, next) {
  return res.status('500').json({
    msg: 'HUBO UN ERROR',
    error: err.message,
  });
});

const httpServer = http.Server(app);

export default httpServer;
