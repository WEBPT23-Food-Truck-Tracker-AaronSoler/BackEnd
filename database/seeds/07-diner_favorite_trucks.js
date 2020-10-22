exports.seed = function(knex) {
return knex('diner_favorite_trucks').insert([
      {id: 1, truck_id: 1, diner_id: 1},
      {id: 2, truck_id: 1, diner_id: 2},
      {id: 3, truck_id: 2, diner_id: 1},
      {id: 4, truck_id: 4, diner_id: 1},
      {id: 5, truck_id: 3, diner_id: 2},
      
      ]);
};
