import {
  Attributes,
  Includeable,
  Model,
  ModelStatic,
  Transaction,
  WhereOptions,
} from 'sequelize';
import serverConfig from '../configs/server.config';
import NotFoundError from '../errors/notfound.error';
import BadRequestError from '../errors/badrequest.error';

class BaseService<T extends Model> {
  constructor(private model: ModelStatic<T>, private entityName: string) {}

  protected generateIncludables<T extends Model>(
    model: ModelStatic<T>,
    alias: string,
    attributes?: Array<string>,
    includables?: Array<Includeable>,
  ) {
    return {
      model,
      as: alias,
      attributes,
      includables: { ...(includables && { include: includables }) },
    };
  }

  protected async getOrError(
    whereQuery: WhereOptions<T>,
    withError: boolean = false,
    includables?: Includeable[],
    transaction?: Transaction,
  ): Promise<T> {
    const record = await this.model.findOne({
      where: whereQuery,
      include: includables,
      transaction,
    });

    if (!record && withError) {
      throw new NotFoundError(`This ${this.entityName} could not be found`);
    }

    return record as T;
  }

  // protected async create<U extends Partial<Attributes<T>>>(
  //   data: U,
  //   includables?: Includeable[],
  // ): Promise<T> {
  //   const isExisting = await this.model.findOne({
  //     where: { ...data },
  //   });

  //   if (!isExisting) {
  //     throw new BadRequestError(`${this.entityName} Already Exists!`);
  //   }

  //   const record = await this.model.create(data as T['_creationAttributes']);

  //   return (await record.reload({ include: includables })) as T;
  // }
}

export default BaseService;
