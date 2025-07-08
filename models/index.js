import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import UserModel from './user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = (await import('../config/config.js')).default?.[env] || {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = UserModel(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User
};

export { sequelize, Sequelize, User };
export default db;
