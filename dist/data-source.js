"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const DB_USERNAME = 'username';
const DB_PASWORD = encodeURIComponent('Y4YWkcry3byVbxIC');
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mongodb',
    url: `mongodb+srv://${DB_USERNAME}:${DB_PASWORD}@cluster0.4mjxxiw.mongodb.net/?retryWrites=true&w=majority`,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/entities/*.ts`],
});
