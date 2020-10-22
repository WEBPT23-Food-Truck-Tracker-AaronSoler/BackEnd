
exports.seed = function(knex) {

      return knex('menu_items').insert([
        {id: 1, item_name: 'Nachos Con Carne', item_description: 'With rare steak...', item_price: 12.99, truck_id: 1},
        {id: 2, item_name: 'Fish Taco', item_description: 'With Housemade Crema, Avocado', item_price: 5.99, truck_id: 1},
        {id: 3, item_name: 'Pepperoni Pizza', item_description: 'Special cheese blend, heirloom tomatoes', item_price: 15.99, truck_id: 2},
        {id: 4, item_name: 'Garlic Knots', item_description: 'Oily and Garlicky', item_price: 2.99, truck_id: 2},
        {id: 5, item_name: 'New York Style Dog', item_description: 'Kraut, Onions, Mustard', item_price: 4.99, truck_id: 3},
        {id: 6, item_name: 'French Fries', item_description: 'Super Crispy', item_price: 2.99, truck_id: 3},
        {id: 7, item_name: 'Saag Paneer', item_description: 'Spinach curry with cheese curd', item_price: 13.99, truck_id: 4},
        {id: 8, item_name: 'Tikka Masala', item_description: 'Choice of chicken or lamb, tomato yogurt sauce', item_price: 14.99, truck_id: 4},
      ]);
};
