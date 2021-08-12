// eslint-disable-next-line no-unused-vars
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

// eslint-disable-next-line no-unused-vars
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
