const dbconfig = require('../db/config');
const knex = require('knex')(dbconfig.sqlite3);

(async () => {
    try {
      const tableExist = await knex.schema.hasTable('messages');
      
      if (!tableExist) {
        await knex.schema.createTable('messages', (table) => {
            table.increments('id').primary();
            table.string('author');
            table.string('text');
            table.timestamp('dateTime').defaultTo(knex.fn.now())
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