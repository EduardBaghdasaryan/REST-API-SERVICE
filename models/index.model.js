import dbConfig from "../config/db.config.js";

import Sequelize from "sequelize";

import fileModel from "./file.model.js";
import usersModel from "./users.model.js";
import tokensModel from "./tokens.model.js";


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});

const db = {};

db.files = fileModel(sequelize, Sequelize);
db.users = usersModel(sequelize, Sequelize);
db.tokens = tokensModel(sequelize, Sequelize);

export default db;