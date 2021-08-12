// eslint-disable-next-line no-unused-vars
exports.up = function(knex, Promise) {
    return knex.schema.createTable('auth', (table) => {
        table.string('access_token').notNullable();
        table.string('refresh_token').notNullable();
        table.json('user').references().inTable('users')
        table.timestamps(true, true);
    });
};

// eslint-disable-next-line no-unused-vars
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('auth');
};
