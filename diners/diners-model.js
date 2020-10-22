const db = require('../database/dbConfig');
const geolib = require('geolib');


const findDinerById = (id) => {
	return db('diners').where({ id }).first();
};

const findDinerByName = (username) => {
	return db('diners').where({ username }).first();
};

const updateDiner = async (changes, id) => {
  await db('diners').where({ id }).update(changes);
  return findDinerById(id)
}

const deleteDiner = async (id) => {
  const response = await findDinerById(id);
	await db('diners').where({ id }).del();
	return response;
}

const getTruckRatingById = (id) => {
  return db('diners_truck_ratings').where({id}).first()
}

const getDinerTruckRatings = async (id) => {
  return db('diners_truck_ratings').where({diner_id: id});
}

const addTruckRating = async (userId, body) => {
  const [id] = await db('diners_truck_ratings').insert({rating: body.rating, diner_id: userId, truck_id: body.truck_id}, 'id');
  return getTruckRatingById(id);
}

const deleteTruckRating = async (id) => {
  const response = await db('diners_truck_ratings').where({id});
  console.log(response)
  await db('diners_truck_ratings').where({id}).del();
  return response;
}

const editTruckRating = async (id, changes) => {
  await db('diners_truck_ratings').where({id}).update(changes);
  return getTruckRatingById(id);
}

const getMenuItemRatingById = (id) => {
  return db('diners_menu_items_ratings').where({id}).first()
}

const getDinerMenuItemRatings = async (id) => {
  return db('diners_menu_items_ratings').where({diner_id: id});
}
const addMenuItemRating = async (userId, body) => {
  const [id] = await db('diners_menu_items_ratings').insert({rating: body.rating, diner_id: userId, menu_item_id: body.menu_item_id}, 'id');
  return getMenuItemRatingById(id);
}

const deleteMenuItemRating = async (id) => {
  const response = await db('diners_menu_items_ratings').where({id});
  await db('diners_menu_items_ratings').where({id}).del();
  return response;
}

const editMenuItemRating = async (id, changes) => {
  await db('diners_menu_items_ratings').where({id}).update(changes);
  return getMenuItemRatingById(id);
}

const getFavoriteTrucks = (userId) => {
  return db('diner_favorite_trucks').join('trucks', 'diner_favorite_trucks.truck_id', 'trucks.id').join('diners', 'diner_favorite_trucks.diner_id', 'diners.id').where('diners.id', userId).select('trucks.*')
}

const addFavoriteTruck = async (truckId, dinerId) => {
  const [id] = await db('diner_favorite_trucks').insert({truck_id: truckId, diner_id: dinerId}, 'id');
  return db('diner_favorite_trucks').where({id}).first();
}

const deleteFavoriteTruck = async (id) => {
  const response = await db('diner_favorite_trucks').where({id}).first();
  await db('diner_favorite_trucks').where({id}).del();
  return response;
}

const findLocalTrucks = async (id, location, distance, favorites, cuisineType) => {
  const computedDistance = distance ? distance * 805 : 1610;
  let trucks;
  if (favorites.toLowerCase() === 'true') {
    trucks = await getFavoriteTrucks(id)
  } else {
    trucks = await db('trucks');
  }

  if (cuisineType) {
    trucks = trucks.filter(truck => {
      if (truck.cuisine_type.toLowerCase() === cuisineType.toLowerCase()) {
        return truck;
      }
    })
  }
  
 const localTrucks = trucks.filter(truck => {
   let truckLocation = JSON.parse(truck.location)
   if (geolib.getDistance(location, truckLocation) <= computedDistance) {
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
  getFavoriteTrucks
}