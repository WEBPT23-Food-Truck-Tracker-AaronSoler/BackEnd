
exports.seed = function(knex) {

      return knex('trucks').insert([
       {cuisine_type: "Mexican", truck_name: "Pancho Villas", location: "{\"longitude\":-74.00676748,\"latitude\":40.7202806}", operator_id: 1},
       {cuisine_type: "Pizza", truck_name: "Mike's PizzaTruck", location: "{\"longitude\":-74.0618995,\"latitude\":40.74179804}", operator_id: 2},
       {cuisine_type: "Hot Dogs", truck_name: "Jenny's Hot Franks", location: "{\"longitude\":-73.99493845,\"latitude\":40.71373295}", operator_id: 3},
       {cuisine_type: "Indian", truck_name: "Taste Of Goa", location: "{\"longitude\":-73.9340461,\"latitude\":40.72607474}", operator_id: 4},
      ]);
};
