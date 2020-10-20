
exports.up = function(knex) {
    return knex.schema.createTable('diners', tbl => {
        tbl.increments('id').primary();
        tbl.string('username', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.string('email', 255).notNullable().unique();
        tbl.string('first_name', 255).notNullable();
        tbl.string('last_name', 255).notNullable();
        tbl.string('current_location');  
      })
      .createTable('operators', tbl => {
        tbl.increments('id').primary();
        tbl.string('username', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.string('email', 255).notNullable().unique();
        tbl.string('first_name', 255).notNullable();
        tbl.string('last_name', 255).notNullable();
      })
      .createTable('trucks', tbl => {
        tbl.increments('id').primary();
        tbl.string('truck_image');
        tbl.string('cuisine_type').notNullable();
        tbl.string('location', 255);
        tbl.string('departure_time', 255);
        tbl.integer('operator_id').notNullable().unsigned().references('id').inTable('operators');
      })
      .createTable('menu_items', tbl => {
        tbl.increments('id').primary();
        tbl.string('item_name').notNullable()
        tbl.string('item_description').notNullable();
        tbl.float('item_price').notNullable();
        tbl.integer('truck_id').unsigned().references('id').inTable('trucks').notNullable();
      })
      .createTable('diners_menu_items_ratings', tbl => {
        tbl.increments('id').primary();
        tbl.integer('rating').notNullable();
        tbl.integer('diner_id').unsigned().references('id').inTable('diners').notNullable()
        tbl.integer('menu_item_id').unsigned().references('id').inTable('menu_items').notNullable()
      })
      .createTable('diners_truck_ratings', tbl => {
        tbl.increments('id').primary();
        tbl.integer('rating').notNullable();
        tbl.integer('truck_id').unsigned().references('id').inTable('trucks').notNullable()
        tbl.integer('diner_id').unsigned().references('id').inTable('diners').notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('diners_trucks_ratings').dropTableIfExists('diners_menu_items_ratings').dropTableIfExists('menu_items').dropTableIfExists('trucks').dropTableIfExists('operators').dropTableIfExists('diners')
};
