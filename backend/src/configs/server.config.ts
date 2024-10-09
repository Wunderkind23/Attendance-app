import { config } from 'dotenv';
config();
import debug from 'debug';

class ServerConfig {
  public NODE_ENV = process.env.NODE_ENV === 'dev' ? 'dev' : 'staging';

  public PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  public RABBITMQ_URI = process.env.RABBITMQ_URI;

  public GRPC_URL = process.env.GRPC_URL;

  public DEBUG = this.NODE_ENV === 'dev' ? debug('dev') : console.log;
}

export default new ServerConfig();
