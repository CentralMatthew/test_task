const {dbConstant : {DB_PASSWORD, DB_USER, DB_SCHEMA}} = require("../constants");
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: DB_SCHEMA,
      user: DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
