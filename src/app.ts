import path from 'path';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import log from '@ajar/marker';
import {
  errorLogger,
  errorResponse,
  printError,
  urlNotFound
} from './middleware/errors.handler.js';
import userRouter from './modules/user/user.router.js';
import { connectDb } from './db/mongoose.connection.js';
import { logger } from './middleware/logger.middleware.js';
import { attachRequestId } from './middleware/attachRequestId.middleware.js';

const { cwd } = process;
const { PORT = 8080, HOST = 'localhost', DB_URI } = process.env;

class App {
  static readonly REQUESTS_LOG_PATH = path.join(cwd(), 'logs', 'requests.log');
  static readonly ERRORS_LOG_PATH = path.join(cwd(), 'logs', 'errors.log');

  private readonly _app: Application;

  constructor() {
    this._app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorMiddlewares();
  }

  private initializeMiddlewares() {
    this._app.use(attachRequestId);
    this._app.use(cors());
    this._app.use(morgan('dev'));
    this._app.use(logger(App.REQUESTS_LOG_PATH));
    this._app.use(express.json());
  }

  private initializeRoutes() {
    this._app.use('/api/users', userRouter.router);
  }

  private initializeErrorMiddlewares() {
    this._app.use(urlNotFound);
    this._app.use(printError);
    this._app.use(errorLogger(App.ERRORS_LOG_PATH));
    this._app.use(errorResponse);
  }

  async start() {
    await connectDb(DB_URI as string);
    this._app.listen(Number(PORT), HOST as string, () => {
      log.magenta('api is live on', ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);
    });
  }
}

const app = new App();

export default app;
