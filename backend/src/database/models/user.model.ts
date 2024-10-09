import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  INTEGER,
  STRING,
  BOOLEAN,
  DATE,
} from 'sequelize';

import { UserAttributesI } from '../../interface/user.interface';

import BCRYPT from '../../utils/bcrypt.utils';
import { Role } from '../../interface/user.interface';

export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements UserAttributesI
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare password: string;
  declare email: string;
  declare role?: Role;
  declare isVerified: boolean;
  declare clockInTime: Date;
  declare clockOutTime: Date;
}

export const initUser = (connection: Sequelize) => {
  User.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER.UNSIGNED,
      },
      name: {
        allowNull: false,
        type: STRING,
      },
      password: {
        allowNull: false,
        type: STRING,
      },
      email: {
        allowNull: false,
        type: STRING,
      },
      role: {
        allowNull: false,
        type: STRING,
        defaultValue: Role.user,
      },
      isVerified: {
        allowNull: false,
        defaultValue: false,
        type: BOOLEAN,
      },
      clockInTime:{
        type:DATE,
        allowNull:true,
      },
      clockOutTime:{
        type:DATE,
        allowNull:true,
      }
    },
    {
      sequelize: connection,
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: (user) => {
          user.password = BCRYPT.encryptPassword(user.password);
        },
        beforeUpdate: (user) => {
          if (user.changed('password') && user.password) {
            user.password = BCRYPT.encryptPassword(user.password);
          }
        },
      },
    },
  );
};

