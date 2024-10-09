import serverConfig from '../configs/server.config';
import dbConfig from '../configs/db.config';
import { Sequelize } from 'sequelize';
import { initModels } from './models';

class DB {
  private connection: Sequelize;
  constructor() {}

  public async connectDatabase() {
    try {
      this.connection = new Sequelize(
        dbConfig.DATABASE_NAME,
        dbConfig.DATABASE_USERNAME,
        dbConfig.DATABASE_PASSWORD,
        { dialect: 'mysql' },
      );

      initModels(this.connection);

      if (serverConfig.NODE_ENV === 'dev') {
        await this.connection.sync();
        await this.connection.sync({ force: true });
        // await this.connection.sync({ alter: true });
      }

      serverConfig.DEBUG(`Database Connection Established.`);
    } catch (error) {
      serverConfig.DEBUG(`Error connecting to the db: ${error}`);
    }
  }

  public async disconnectDatabase() {
    if (this.connection) {
      try {
        await this.connection.close();
        serverConfig.DEBUG(`Database closed successfully`);
      } catch (error) {
        serverConfig.DEBUG(`Error closing DB`);
      }
    }
  }
}

export default new DB();
