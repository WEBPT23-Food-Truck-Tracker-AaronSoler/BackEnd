
exports.seed = function(knex) {
      return knex('diners_truck_ratings').insert([
        {id: 1, rating: 3, truck_id: 1, diner_id: 1},
        {id: 2, rating: 4, truck_id: 2, diner_id: 1},
        {id: 3, rating: 5, truck_id: 3, diner_id: 2},
        {id: 4, rating: 2, truck_id: 2, diner_id: 1},
        {id: 5, rating: 4, truck_id: 4, diner_id: 2},
        {id: 6, rating: 5, truck_id: 1, diner_id: 2},
      ]);
};
