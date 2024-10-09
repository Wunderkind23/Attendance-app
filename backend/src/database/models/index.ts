import { Sequelize } from 'sequelize';



import {  initUser } from './user.model';

export const initModels = (connection: Sequelize) => {
  initUser(connection);


  associate();
};

const associate = () => {
  
};
