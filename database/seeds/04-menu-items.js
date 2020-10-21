
exports.seed = function(knex) {

      return knex('menu_items').insert([
        {item_name: 'Nachos Con Carne', item_description: 'With rare steak...', item_price: 12.99, truck_id: 1},
        {item_name: 'Fish Taco', item_description: 'With Housemade Crema, Avocado', item_price: 5.99, truck_id: 1},
        {item_name: 'Pepperoni Pizza', item_description: 'Special cheese blend, heirloom tomatoes', item_price: 15.99, truck_id: 2},
      ]);
};
