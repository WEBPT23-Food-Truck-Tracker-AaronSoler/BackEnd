const {
	findDinerById,
	findDinerByName,
	updateDiner,
	deleteDiner,
	findLocalTrucks,
	addTruckRating,
	getDinerTruckRatings,
	deleteTruckRating,
	editTruckRating,
	getMenuItemRatingById,
	addMenuItemRating,
	deleteMenuItemRating,
	editMenuItemRating,
	getDinerMenuItemRatings,
	addFavoriteTruck,
	deleteFavoriteTruck,
	getFavoriteTrucks,
} = require('./diners-model');
const db = require('../database/dbConfig');

const diner1 = {
	id: 1,
	username: 'user1',
	password: '$2a$08$1AdUa58p4M83U8gavFWzAukZkEhMjus4VpRxUbFrrT3ePXiREjf6q',
	email: 'someone@email.com',
	first_name: 'John',
	last_name: 'Doe',
	current_location: '{"longitude":-74.00909759,"latitude":40.71789583}',
};

const diner2 = {
	id: 2,
	username: 'user2',
	password: '$2a$10$1KPkH0JOoDRZl2EVd3Sxze1ERumKOVE1vFF6Q2roxO6OkkW10ww2S',
	email: 'someone2@email.com',
	first_name: 'Jane',
	last_name: 'Doe',
	current_location: '{"longitude":-74.00987148,"latitude":40.71690914}',
};

const truck1 = {
	cuisine_type: 'Hot Dogs',
	truck_name: "Jenny's Hot Franks",
	location: '{"longitude":-73.99493845,"latitude":40.71373295}',
	operator_id: 3,
};
const truck2 = {
	cuisine_type: 'Indian',
	truck_name: 'Taste Of Goa',
	location: '{"longitude":-73.9340461,"latitude":40.72607474}',
	operator_id: 4,
};

const menuItem = {
	id: 1,
	item_name: 'Nachos Con Carne',
	item_description: 'With rare steak...',
	item_price: 12.99,
	truck_id: 1,
};

describe('diners-model', () => {
	beforeEach(async () => {
		await db('diners').truncate();
		await db('trucks').truncate();
		await db('diner_favorite_trucks').truncate();
		await db('diners_truck_ratings').truncate();
		await db('diners_menu_items_ratings').truncate();
		await db('menu_items').truncate();
		await db('diner_favorite_trucks').truncate();
	});

	describe('findDinerById', () => {
		it('returns correct diner when given an ID', async () => {
			await db('diners').insert(diner1);
			await db('diners').insert(diner2);

			let res = await findDinerById(1);
			expect(res.username).toBe('user1');
			expect(res.password).toBe(
				'$2a$08$1AdUa58p4M83U8gavFWzAukZkEhMjus4VpRxUbFrrT3ePXiREjf6q'
			);
			expect(res.first_name).toBe('John');
			expect(res.last_name).toBe('Doe');
			expect(res.email).toBe('someone@email.com');
			expect(res.current_location).toBe(
				'{"longitude":-74.00909759,"latitude":40.71789583}'
			);

			res = await findDinerById(2);
			expect(res.username).toBe('user2');
			expect(res.password).toBe(
				'$2a$10$1KPkH0JOoDRZl2EVd3Sxze1ERumKOVE1vFF6Q2roxO6OkkW10ww2S'
			);
			expect(res.first_name).toBe('Jane');
			expect(res.last_name).toBe('Doe');
			expect(res.email).toBe('someone2@email.com');
			expect(res.current_location).toBe(
				'{"longitude":-74.00987148,"latitude":40.71690914}'
			);
		});
	});

	describe('findDinerByName', () => {
		it('returns correct diner when given a username', async () => {
			await db('diners').insert(diner1);
			await db('diners').insert(diner2);

			let res = await findDinerByName('user1');
			expect(res.username).toBe('user1');
			expect(res.password).toBe(
				'$2a$08$1AdUa58p4M83U8gavFWzAukZkEhMjus4VpRxUbFrrT3ePXiREjf6q'
			);
			expect(res.first_name).toBe('John');
			expect(res.last_name).toBe('Doe');
			expect(res.email).toBe('someone@email.com');
			expect(res.current_location).toBe(
				'{"longitude":-74.00909759,"latitude":40.71789583}'
			);

			res = await findDinerByName('user2');
			expect(res.username).toBe('user2');
			expect(res.password).toBe(
				'$2a$10$1KPkH0JOoDRZl2EVd3Sxze1ERumKOVE1vFF6Q2roxO6OkkW10ww2S'
			);
			expect(res.first_name).toBe('Jane');
			expect(res.last_name).toBe('Doe');
			expect(res.email).toBe('someone2@email.com');
			expect(res.current_location).toBe(
				'{"longitude":-74.00987148,"latitude":40.71690914}'
			);
		});
	});

	describe('updateDiner', () => {
		it('updates diner info', async () => {
			await db('diners').insert(diner1);
			let res = await db('diners').where({ id: 1 }).first();

			expect(res.username).toBe('user1');
			expect(res.password).toBe(
				'$2a$08$1AdUa58p4M83U8gavFWzAukZkEhMjus4VpRxUbFrrT3ePXiREjf6q'
			);
			expect(res.first_name).toBe('John');
			expect(res.last_name).toBe('Doe');
			expect(res.email).toBe('someone@email.com');
			expect(res.current_location).toBe(
				'{"longitude":-74.00909759,"latitude":40.71789583}'
			);

			const changes = {
				username: 'updated',
				first_name: 'Jimmy',
				last_name: 'Smits',
			};
			res = await updateDiner(changes, 1);

			expect(res.username).toBe('updated');
			expect(res.password).toBe(
				'$2a$08$1AdUa58p4M83U8gavFWzAukZkEhMjus4VpRxUbFrrT3ePXiREjf6q'
			);
			expect(res.first_name).toBe('Jimmy');
			expect(res.last_name).toBe('Smits');
			expect(res.email).toBe('someone@email.com');
			expect(res.current_location).toBe(
				'{"longitude":-74.00909759,"latitude":40.71789583}'
			);
		});
	});

	describe('deleteDiner', () => {
		it('deletes a diner', async () => {
			await db('diners').insert(diner1);
			await db('diners').insert(diner2);

			let res = await db('diners');
			expect(res).toHaveLength(2);

			await deleteDiner(1);
			res = await db('diners');

			expect(res).toHaveLength(1);
		});
	});

	describe('findLocalTrucks', () => {
		beforeEach(async () => {
			await db('trucks').insert(truck1);
			await db('trucks').insert(truck2);
		});

		it('gets trucks within specified distance', async () => {
			const [id] = await db('diners').insert(diner1);
			const diner = await db('diners').where({ id }).first();
			let res = await findLocalTrucks(
				diner.id,
				JSON.parse(diner.current_location),
				2,
				null,
				null
			);
			expect(res).toHaveLength(1);

			res = await findLocalTrucks(
				diner.id,
				JSON.parse(diner.current_location),
				10,
				null,
				null
			);

			expect(res).toHaveLength(2);
		});

		it('returns only favorite trucks when passed in true query param', async () => {
			const [id] = await db('diners').insert(diner2);
			const diner = await db('diners').where({ id }).first();
			await db('diner_favorite_trucks').insert({
				id: 1,
				truck_id: 1,
				diner_id: 2,
			});
			let res = await findLocalTrucks(
				diner.id,
				JSON.parse(diner.current_location),
				100,
				'true',
				null
			);
			expect(res).toHaveLength(1);

			await db('diner_favorite_trucks').insert({
				id: 2,
				truck_id: 2,
				diner_id: 2,
			});

			res = await findLocalTrucks(
				diner.id,
				JSON.parse(diner.current_location),
				100,
				'true',
				null
			);

			expect(res).toHaveLength(2);
		});

		it('filters by cuisine type', async () => {
			await db('diners').insert(diner1);
			await db('diners').insert(diner2);

			const diner = await db('diners').where({ id: 1 }).first();

			let res = await findLocalTrucks(
				diner.id,
				JSON.parse(diner.current_location),
				100,
				null,
				'Hot Dogs'
			);
			expect(res).toHaveLength(1);

			res = await findLocalTrucks(
				diner.id,
				JSON.parse(diner.current_location),
				100,
				null,
				'Pizza'
			);

			expect(res).toHaveLength(0);
		});
	});

	describe('addTruckRating', () => {
		it('adds a truck rating', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			let res = await db('diners_truck_ratings');
			expect(res).toHaveLength(0);
			const body = {
				rating: 4,
				truck_id: 1,
			};
			const user = await db('diners').where({ id: 1 }).first();
			await addTruckRating(user.id, body);
			res = await db('diners_truck_ratings');
			expect(res).toHaveLength(1);
		});
	});

	describe('deleteTruckRating', () => {
		it('deletes a truck rating', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);

			const body = {
				rating: 4,
				truck_id: 1,
			};
			const user = await db('diners').where({ id: 1 }).first();
			await addTruckRating(user.id, body);
			let res = await db('diners_truck_ratings');

			expect(res).toHaveLength(1);

			await deleteTruckRating(1);
			res = await db('diners_truck_ratings');

			expect(res).toHaveLength(0);
		});
	});

	describe('editTruckRating', () => {
		it('changes a trucks rating', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);

			const body = {
				rating: 4,
				truck_id: 1,
			};
			const user = await db('diners').where({ id: 1 }).first();
			await addTruckRating(user.id, body);
			let res = await db('diners_truck_ratings');
			expect(res[0].rating).toBe(4);
			await editTruckRating(1, { rating: 3 });
			res = await db('diners_truck_ratings');
			expect(res[0].rating).toBe(3);
		});
	});

	describe('getDinerTruckRatings', () => {
		it('gets a list of truck ratings for a specific diner', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			let res = await getDinerTruckRatings(1);
			expect(res).toHaveLength(0);
			const body = {
				rating: 4,
				truck_id: 1,
			};
			const user = await db('diners').where({ id: 1 }).first();
			await addTruckRating(user.id, body);

			res = await getDinerTruckRatings(1);
			expect(res).toHaveLength(1);
		});
	});

	describe('getDinerMenuItemRatings', () => {
		it('gets a list of a diners menu item ratings', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			const user = await db('diners').where({ id: 1 }).first();
			const res = await getDinerMenuItemRatings(user.id);
			console.log(res);
			expect(res).toHaveLength(0);
			expect.arrayContaining(res);
		});
	});

	describe('addMenuItemRating', () => {
		it('adds a menu item rating', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			await db('menu_items').insert(menuItem);
			const user = await db('diners').where({ id: 1 }).first();
			let res = await getDinerMenuItemRatings(user.id);
			expect(res).toHaveLength(0);
			const body = {
				rating: 4,
				// diner_id: user.id,
				menu_item_id: 1,
			};
			await addMenuItemRating(user.id, body);
			res = await getDinerMenuItemRatings(user.id);
			expect(res).toHaveLength(1);
		});
	});

	describe('deleteMenuItemRating', () => {
		it('deletes a menu item rating', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			await db('menu_items').insert(menuItem);
			const user = await db('diners').where({ id: 1 }).first();
			const body = {
				rating: 4,
				// diner_id: user.id,
				menu_item_id: 1,
			};
			await addMenuItemRating(user.id, body);
			let res = await db('diners_menu_items_ratings');
			expect(res).toHaveLength(1);

			await deleteMenuItemRating(1);
			res = await db('diners_menu_items_ratings');
			expect(res).toHaveLength(0);
		});
	});

	describe('editMenuItemRating', () => {
		it('edits a menu item rating', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			await db('menu_items').insert(menuItem);
			const user = await db('diners').where({ id: 1 }).first();
			const body = {
				rating: 4,
				// diner_id: user.id,
				menu_item_id: 1,
			};
			await addMenuItemRating(user.id, body);
			let res = await db('diners_menu_items_ratings');
			expect(res[0].rating).toBe(4);

			await editMenuItemRating(1, { rating: 3 });
			res = await db('diners_menu_items_ratings');
			expect(res[0].rating).toBe(3);
		});
	});

	describe('getMenuItemRatingById', () => {
		it('gets a menu item rating by ID', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			await db('menu_items').insert(menuItem);
			const user = await db('diners').where({ id: 1 }).first();
			const body = {
				rating: 4,
				// diner_id: user.id,
				menu_item_id: 1,
			};
			await addMenuItemRating(user.id, body);
			let res = await db('diners_menu_items_ratings');
			res = await getMenuItemRatingById(res[0].id);
			expect(res.id).toBe(1);
			expect(res.rating).toBe(4);
			expect(res.menu_item_id).toBe(1);
		});
	});

	describe('addFavoriteTruck', () => {
		it('adds a favorite trucks', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			const user = await db('diners').where({ id: 1 }).first();
			const truck = await db('trucks').where({ id: 1 }).first();
			let res = await db('diner_favorite_trucks');
			expect(res).toHaveLength(0);
			await addFavoriteTruck(truck.id, user.id);
			res = await db('diner_favorite_trucks');
			expect(res).toHaveLength(1);
		});
	});

	describe('deleteFavoriteTruck', () => {
		it('deletes a favorite truck', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			const user = await db('diners').where({ id: 1 }).first();
			const truck = await db('trucks').where({ id: 1 }).first();
			await addFavoriteTruck(truck.id, user.id);
			let res = await db('diner_favorite_trucks');
			expect(res).toHaveLength(1);
			await deleteFavoriteTruck(1);
			res = await db('diner_favorite_trucks');
			expect(res).toHaveLength(0);
		});
	});

	describe('getFavoriteTrucks', () => {
		it('gets a list of diners favorite trucks', async () => {
			await db('diners').insert(diner1);
			await db('trucks').insert(truck1);
			const user = await db('diners').where({ id: 1 }).first();
			const truck = await db('trucks').where({ id: 1 }).first();
			await addFavoriteTruck(truck.id, user.id);
			const res = await getFavoriteTrucks(user.id);
			expect(res).toHaveLength(1);
		});
	});
});
