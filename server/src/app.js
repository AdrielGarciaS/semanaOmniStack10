import 'dotenv/config';

import Youch from 'youch';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import http from 'http';

import databaseConfig from './config/database';
import routes from './routes';
import { setupWebsocket } from './websocket';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    setupWebsocket(this.server);

    mongoose.connect(databaseConfig.mongoServer, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App();
