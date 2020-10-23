const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');

let diner1 = {
	username: 'user1',
	password: 'password',
	email: 'someone@email.com',
	first_name: 'John',
	last_name: 'Doe',
	current_location: '{"longitude":-74.00909759,"latitude":40.71789583}',
};

describe('server', () => {
	it('should run in a testing environment', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});

	beforeEach(async () => {
		await db('diners').truncate();
		await db('trucks').truncate();
		await db('diner_favorite_trucks').truncate();
		await db('diners_truck_ratings').truncate();
		await db('diners_menu_items_ratings').truncate();
		await db('menu_items').truncate();
		await db('diner_favorite_trucks').truncate();
		diner1.username = 'user1';
		diner1.password = 'password';
		diner1.email = 'someone@email.com';
		diner1.first_name = 'John';
		diner1.last_name = 'Doe';
	});

	describe('POST /api/diner/register', () => {
		it('should allow a diner to register', async () => {
			const response = await request(server)
				.post('/api/diner/register')
				.send(diner1);
			const { username, password, email } = JSON.parse(response.text);
			expect(response.status).toBe(201);
			expect(username).toBe('user1');
			expect(password).not.toBe('password');
		});

		it('should return an error if missing username', async () => {
			delete diner1.username;
			const response = await request(server)
				.post('/api/diner/register')
				.send(diner1);
			expect(response.status).toBe(400);
		});

		it('should return an error if missing password', async () => {
			delete diner1.password;
			const response = await request(server)
				.post('/api/diner/register')
				.send(diner1);
			expect(response.status).toBe(400);
		});

		it('should return an error if missing first_name', async () => {
			delete diner1.first_name;
			const response = await request(server)
				.post('/api/diner/register')
				.send(diner1);
			expect(response.status).toBe(400);
		});

		it('should return an error if missing last_name', async () => {
			delete diner1.last_name;
			const response = await request(server)
				.post('/api/diner/register')
				.send(diner1);
			expect(response.status).toBe(400);
		});

		it('should return an error if missing email', async () => {
			delete diner1.email;
			const response = await request(server)
				.post('/api/diner/register')
				.send(diner1);
			expect(response.status).toBe(400);
		});
	});

	describe('POST /api/diner/login', () => {
		beforeEach(async () => {
			await request(server).post('/api/diner/register').send(diner1);
		});
		it('should allow a user with proper credentials to login', async () => {
			const response = await request(server).post('/api/diner/login').send({
				username: diner1.username,
				password: diner1.password,
			});
			expect(response.status).toBe(200);
			const res = JSON.parse(response.text);
			console.log(res);
			expect(res.message).toBe('Welcome, user1');
			expect(res.token).toBeTruthy();
		});
	});

	it('should not allow a user without proper credentials to login', async () => {
		let response = await request(server).post('/api/diner/login').send({
			username: null,
			password: diner1.password,
			location: diner1.current_location,
		});
		expect(response.status).toBe(400);

		response = await request(server).post('/api/diner/login').send({
			username: diner1.username,
			password: null,
			location: diner1.current_location,
		});
		expect(response.status).toBe(400);
	});

	describe('GET /api/restricted/diner/:userId/dashboard', () => {
		beforeEach(async () => {
			await request(server).post('/api/diner/register').send(diner1);
		});

		it('should not allow a user without credentials access', async () => {
			const response = await request(server).get(
				'/api/restricted/diner/1/dashboard'
			);
			expect(response.status).toBe(401);
		});

		it('should allow user with proper credentials to get list of trucks', async () => {
			const login = await request(server).post('/api/diner/login').send({
				username: diner1.username,
				password: diner1.password,
			});
			const { token } = JSON.parse(login.text);
			// console.log(token);
			const response = await request(server)
				.get('/api/restricted/diner/1/dashboard')
				.set({ Authorization: `Bearer ${token}` });
			expect(response.status).toBe(200);
			console.log(response.text);
		});
	});

	describe('PUT /api/restricted/diner/:userId', () => {
		beforeEach(async () => {
			await request(server).post('/api/diner/register').send(diner1);
		});

		it('should not allow a user without credentials access', async () => {
			const response = await request(server)
				.put('/api/restricted/diner/1/')
				.send({ username: 'user2' });
			expect(response.status).toBe(401);
		});

		it('should allow access to update user info with proper credentials', async () => {
			const login = await request(server).post('/api/diner/login').send({
				username: diner1.username,
				password: diner1.password,
			});
			const { token } = JSON.parse(login.text);

			const response = await request(server)
				.put('/api/restricted/diner/1/')
				.set({ Authorization: `Bearer ${token}` })
				.send({ username: 'user2' });
			expect(response.status).toBe(200);
			const parsedRes = JSON.parse(response.text);
			expect(parsedRes.message).toBe('Update-- Success!');
			expect(parsedRes.data.username).toBe('user2');
		});
	});

	describe('DELETE /api/restricted/diner/:userId', () => {
		beforeEach(async () => {
			await request(server).post('/api/diner/register').send(diner1);
		});

		it('should not allow a user without credentials access', async () => {
			const response = await request(server).delete('/api/restricted/diner/1/');
			expect(response.status).toBe(401);
		});

		it('should allow access to delete account with proper credentials', async () => {
			const login = await request(server).post('/api/diner/login').send({
				username: diner1.username,
				password: diner1.password,
			});
			const { token } = JSON.parse(login.text);

			const response = await request(server)
				.delete('/api/restricted/diner/1/')
				.set({ Authorization: `Bearer ${token}` });

			expect(response.status).toBe(200);
			console.log(response.status);
			const parsedRes = JSON.parse(response.text);
			expect(parsedRes.message).toBe('Delete-- Success!');
		});
	});
});
