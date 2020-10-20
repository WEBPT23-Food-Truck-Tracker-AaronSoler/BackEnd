
exports.seed = function(knex) {

      return knex('trucks').insert([
       {cuisine_type: "Mexican", location: "{\"longitude\":-74.00676748,\"latitude\":40.7202806}", operator_id: 1},
       {cuisine_type: "Pizza", location: "{\"longitude\":-74.0618995,\"latitude\":40.74179804}", operator_id: 1}
      ]);
};
