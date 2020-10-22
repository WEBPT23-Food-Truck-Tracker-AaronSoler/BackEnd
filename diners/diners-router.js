const router = require('express').Router();
const diner = require('./diners-model');
const bcrypt = require('bcryptjs');

// Returns trucks within .5 miles or supplied distance of users location. Add query string favorites=true to get back list of favorite trucks
router.get('/:userId/dashboard', async (req, res, next) => {
  const id = req.params.userId;
  const distance = req.query.radius;
  const favorites = req.query.favorites;
  const cuisineType = req.query.cuisine;

  try {
  const {current_location} = await diner.findDinerById(id);
  const location = JSON.parse(current_location);
  const response = await diner.findLocalTrucks(id, location, distance, favorites, cuisineType);
  
  res.status(200).json(response)
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong...', error})
  }
})

// Edit user info
router.put('/:userId', async (req, res, next) => {
  const id = req.params.userId;
  const changes = req.body;
  if (changes.password) {
    const rounds = parseInt(process.env.ROUNDS);
		const hash = bcrypt.hashSync(changes.password, rounds || 8);
		changes.password = hash;
  }
  if (id && changes) { 
  try {
   const response = await diner.updateDiner(changes, id);
    res.status(200).json({message: 'Update-- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
  } else {
    next({statusCode: 400, message: 'Missing required data!', error})
  }
});

// Delete account
router.delete('/:userId', async (req, res, next) => {
  const id = req.params.userId;
  if (id) {
    try {
    const response = await diner.deleteDiner(id);
    res.status(200).json({message: 'Delete-- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
  } else {
    next({statusCode: 400, message: 'Missing Username, try again!', error})
  }
});

//Add Truck Rating
router.post('/:userId/truck', async (req, res, next) => {
  const body = req.body;
  const id = req.params.userId;
  try {
    const response = await diner.addTruckRating(id, body);
    res.status(201).json(response)
  } catch (error) {
     next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Get Diners Truck Ratings
router.get('/:userId/truck', async (req, res, next) => {
  const id = req.params.userId;
  
  try {
    const response = await diner.getDinerTruckRatings(id);
  res.status(200).json(response);
  } catch (error) {
     next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Delete Truck Rating
router.delete('/:ratingId/truck', async (req, res, next) => {
  const id = req.params.ratingId;
  try {
    console.log('TRY')
    const response = await diner.deleteTruckRating(id);
    res.status(200).json({message: 'Deleted Rating -- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Edit Truck Rating
router.put('/:ratingId/truck', async (req, res, next) => {
  const id = req.params.ratingId;
  const changes = req.body;
  try {
    const response = await diner.editTruckRating(id, changes);
    res.status(200).json({message: 'Edited Rating -- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Get Diners Menu Item Ratings
router.get('/:userId/menuitem', async (req, res, next) => {
  const id = req.params.userId;
  
  try {
    const response = await diner.getDinerMenuItemRatings(id);
  res.status(200).json(response);
  } catch (error) {
     next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Add Menu Item Rating
router.post('/:userId/menuitem', async (req, res, next) => {
  const changes = req.body;
  const id = req.params.userId;
  try {
    const response = await diner.addMenuItemRating(id, changes);
    res.status(201).json(response)
  } catch (error) {
     next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Delete Menu Item Rating
router.delete('/:ratingId/menuitem', async (req, res, next) => {
  const id = req.params.ratingId;
  try {
    console.log('TRY')
    const response = await diner.deleteMenuItemRating(id);
    res.status(200).json({message: 'Deleted Rating -- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Edit Menu Item Rating
router.put('/:ratingId/menuitem', async (req, res, next) => {
  const id = req.params.ratingId;
  const changes = req.body;
  try {
    const response = await diner.editMenuItemRating(id, changes);
    res.status(200).json({message: 'Edited Rating -- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
});

//Get favorite trucks of a Diner
router.get('/:userId/favoritetrucks', async (req, res, next) => {
  const id = req.params.userId;
  try {
    const response = await diner.getFavoriteTrucks(id);
    res.status(200).json(response);
  } catch (error) {
      next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})
//Add Truck to Favorites
router.post('/:userId/favoritetrucks', async (req, res, next) => {
  const userId = req.params.userId;
  const truckId = req.body.truck_id;
  try {
    const response = await diner.addFavoriteTruck(truckId, userId);
    res.status(201).json(response);
  } catch (error) {
      next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
})

//Delete a truck from favorites
router.delete('/:favoriteId/favoritetrucks', async (req, res, next) => {
  const id = req.params.favoriteId;
  try {
    const response = await diner.deleteFavoriteTruck(id);
    res.status(200).json({message: "Deleted Favorite -- Success!!", data: response})
  } catch (error) {
      next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})

  }
})


module.exports = router;


