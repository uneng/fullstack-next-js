exports.up = function (knex) {
	return knex.schema.createTable('users', function (table) {
		table.increments('id');
		table.string('username', 30).notNullable().unique();
		table.string('email', 50).notNullable().unique();
        table.string('name', 100);
        table.string('alamat', 150);
        table.string('mobile', 15);
        $table.timestamp('email_verified_at');
        $table.string('password').notNullable();
        $table.rememberToken();
        $table.string('photo');
        table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('users');
};
