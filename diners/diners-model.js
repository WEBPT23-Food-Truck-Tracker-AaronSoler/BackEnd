const db = require('../database/dbConfig');
const geolib = require('geolib');

const findDinerById = (id) => {
	return db('diners').where({ id }).first();
};

const findDinerByName = (username) => {
	return db('diners').where({ username }).first();
};

const updateDiner = async (changes, username) => {
  await db('diners').where({ username }).update(changes);
  return findDinerByName(username)
}

const deleteDiner = async (username) => {
  const response = await findDinerByName(username);
	await db('diners').where({ username }).del();
	return response;
}

const findLocalTrucks = async (location) => {
 const trucks = await db('trucks');
 const localTrucks = trucks.filter(truck => {
   if (geolib.getDistance(location, JSON.parse(truck.location)) <= 3200) {
     return truck
   } 
 })
 return localTrucks;
}


module.exports = {
  findDinerById,
  findDinerByName,
  updateDiner,
  deleteDiner,
  findLocalTrucks
}