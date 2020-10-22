
exports.seed = function(knex) {
return knex('diners_menu_items_ratings').insert([
      {id: 1, menu_item_id: 1, diner_id: 1, rating: 3},
      {id: 2, menu_item_id: 1, diner_id: 2, rating: 5},
      {id: 3, menu_item_id: 2, diner_id: 1, rating: 2},
      {id: 4, menu_item_id: 3, diner_id: 1, rating: 3},
      {id: 5, menu_item_id: 3, diner_id: 2, rating: 4},
      {id: 6, menu_item_id: 4, diner_id: 1, rating: 5},
      {id: 7, menu_item_id: 5, diner_id: 2, rating: 5},
      {id: 8, menu_item_id: 8, diner_id: 1, rating: 4},
      {id: 9, menu_item_id: 6, diner_id: 2, rating: 5},
      {id: 10, menu_item_id: 7, diner_id: 1, rating: 3},
      ]);
};
