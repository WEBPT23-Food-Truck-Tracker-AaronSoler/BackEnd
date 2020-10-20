const router = require('express').Router();
const diner = require('./diners-model');

router.get('/:username/dashboard', async (req, res, next) => {
  const {username} = req.params;
  try {
  const {current_location} = await diner.findDinerByName(username);
  const response = await diner.findLocalTrucks(JSON.parse(current_location));
  console.log(response);
  res.status(200).json(response)
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong...', error})
  }
})

router.put('/:username', async (req, res, next) => {
  const {username} = req.params;
  const changes = req.body;
  if (username && changes) { 
  try {
   const response = await diner.updateDiner(changes, username);
    res.status(200).json({message: 'Update-- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
  } else {
    next({statusCode: 400, message: 'Missing required data!', error})
  }
});

router.delete('/:username', async (req, res, next) => {
  const {username} = req.params;
  if (username) {
    try {
    const response = await diner.deleteDiner(username);
    res.status(200).json({message: 'Delete-- Success!', data: response})
  } catch (error) {
    next({statusCode: 500, message: 'Something went wrong with the server, try again!', error})
  }
  } else {
    next({statusCode: 400, message: 'Missing Username, try again!', error})
  }
});

module.exports = router;


