import express, { Application } from 'express';
import { Server } from 'http';
import routes from './routes';
import db from './database';
import systemMiddleware from './middleware/system.middleware';
import serverConfig from './configs/server.config';
import compression from 'compression';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';

class App {
  private app: Application;
  private port: number;
  private server!: Server;
  private corsOpts: CorsOptions;

  constructor() {
    this.app = express();
    this.port = serverConfig.PORT;
    this.corsOpts = { origin: '*' };

    this.securityMiddleware(this.app);
    // this.standardMiddleware(this.app);

    let signals = ['SIGTERM', 'SIGINT', 'SIGUSR1', 'SIGUSR2'];

    signals.forEach(async (signal) => {
      process.on(signal, async () => {
        await this.close();
        serverConfig.DEBUG(`Signal Interrupted with signal: ${signal}`);
      });
    });
  }

  private securityMiddleware(app: Application) {
    app.use(compression());
    app.use(helmet());
    app.use(cors(this.corsOpts));
  }

  // private standardMiddleware(app: Application) {
  //   app.use(express.json());
  //   app.use(express.urlencoded({ extended: false }));
  //   app.use(routes);
  //   app.use(systemMiddleware.errorHandler);
  // }

  // private async connectDB() {
  //   await db.connectDatabase();
  // }

  public async start() {
    try {
      this.server = this.app.listen(this.port, () => {
        serverConfig.DEBUG(`Server is listening at port ${this.port}`);
      });
    } catch (error) {
      serverConfig.DEBUG(`Error starting server`);
      throw new Error('An error occurred');
    }
  }

  public async close() {
    if (this.server) {
      try {
        await new Promise<void>((resolve) => {
          this.server.close();
          resolve();
        });

        await db.disconnectDatabase();
        serverConfig.DEBUG('Server Closed Successfully!');
      } catch (error) {
        serverConfig.DEBUG(`There was an error closing the server`);
        throw new Error('An error occurred');
      }
    }
  }
}

const app = new App();
app.start();
