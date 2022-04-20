const path = require('path');
require('dotenv').config()
const firebaseConfig = require('../db/firebase/firebase.config.json');

const MARIADB_HOST = process.env.MARIADB_HOST;
const MARIADB_PORT = process.env.MARIADB_PORT;
const MARIADB_USER = process.env.MARIADB_USER;
const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;
const MARIADB_DATABASE = process.env.MARIADB_DATABASE;
const SQLITE_FILENAME = process.env.SQLITE_FILENAME || path.resolve(__dirname, `./ecommerce.sqlite`);
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_DOMAIN}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

module.exports = {
    ENV: {
        PORT: process.env.PORT || 8080,
        PERS: process.env.PERS || 'mongodb'
    },
    DB_CONFIG: {
        mariadb: {
            client: 'mysql',
            connection: {
              host: MARIADB_HOST,
              port: MARIADB_PORT,
              user: MARIADB_USER,
              password: MARIADB_PASSWORD,
              database: MARIADB_DATABASE
            }
        },
        sqlite: {
            client: 'sqlite3',
            connection: {
              filename: SQLITE_FILENAME || path.resolve(__dirname, `./ecommerce.sqlite`)
            }
        },
        mongodb: {
            uri: MONGODB_URI
        },
        firebase: {
            certification: firebaseConfig
        }
    }
}