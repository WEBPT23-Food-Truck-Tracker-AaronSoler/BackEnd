const db = require('../database/dbConfig');

const findDinerById = (id) => {
	return db('diners').where({ id }).first();
};

const findOperatorById = (id) => {
	return db('operators').where({ id }).first();
};

const addDiner = async (user) => {
	try {
		console.log('Add Diner')
		const [id] = await db('diners').insert(user);
		return findDinerById(id);
	} catch (error) {
		throw error;
	}
};

const addOperator = async (user) => {
	try {
		const [id] = await db('operators').insert(user);
		return findOperatorById(id);
	} catch (error) {
		throw error;
	}
};

const findDinerByName = (username) => {
	return db('diners').where({ username }).first();
};

const findOperatorByName = (username) => {
	return db('operators').where({username}).first();
}

module.exports = {
	findDinerById,
	findOperatorById,
	addDiner,
	addOperator,
	findDinerByName,
	findOperatorByName
};