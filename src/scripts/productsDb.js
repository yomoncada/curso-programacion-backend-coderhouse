const dbconfig = require('../db/config');
const knex = require('knex')(dbconfig.mariaDB);

(async () => {
    try {
      const tableExist = await knex.schema.hasTable('products');
      
      if (!tableExist) {
        await knex.schema.createTable('products', (table) => {
            table.increments('id').primary();
            table.string('title');
            table.string('price');
            table.string('thumbnail');
        });

        console.log('Table created!');
      } else {
        console.log('Skipping creation...');
      }
    } catch (error) {
        throw new Error(`Hubo un error: ${error.message}`);
    } finally {
      knex.destroy();
    }
})();