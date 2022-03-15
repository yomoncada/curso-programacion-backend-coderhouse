const path = require('path');

module.exports = {
  mariaDB: {
    client: 'mysql',
    connection: {
      host : '127.0.0.10',
      port : 3306,
      user : 'root',
      password : '12345678',
      database : 'ecommerce'
    }
  },
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './ecommerce.sqlite')
    }
  }
};