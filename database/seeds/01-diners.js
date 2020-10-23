exports.seed = function (knex) {
	return knex('diners').insert([
		{
			id: 1,
			username: 'user1',
			password: '$2a$08$1AdUa58p4M83U8gavFWzAukZkEhMjus4VpRxUbFrrT3ePXiREjf6q',
			email: 'someone@email.com',
			first_name: 'John',
			last_name: 'Doe',
			current_location: '{"longitude":-74.00909759,"latitude":40.71789583}',
		},
		{
			id: 2,
			username: 'user2',
			password: '$2a$10$1KPkH0JOoDRZl2EVd3Sxze1ERumKOVE1vFF6Q2roxO6OkkW10ww2S',
			email: 'someone2@email.com',
			first_name: 'Jane',
			last_name: 'Doe',
			current_location: '{"longitude":-74.00987148,"latitude":40.71690914}',
		},
	]);
};
