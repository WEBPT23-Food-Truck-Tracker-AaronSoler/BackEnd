const router = require('express').Router();
const bcrypt = require('bcryptjs');


const { isValidRegistration, isValidLogin } = require('./validUser');
const users = require('./auth-model');
const generateToken = require('./generate_token');

router.post('/diner/login', async (req, res, next) => {
	const { username, password } = req.body;

	if (isValidLogin(req.body)) {
		try {
			const user = await users.findDinerByName(username);
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: `Welcome, ${username}`, token });
			} else {
				next({ statusCode: 401, message: 'Invalid Credentials' });
			}
		} catch (error) {
			next({ statusCode: 500, message: 'Something went wrong...', error });
		}
	} else {
		next({ statusCode: 400, message: 'Missing Login Data.' });
	}
});

router.post('/operator/login', async (req, res, next) => {
	const { username, password } = req.body;

	if (isValidLogin(req.body)) {
		try {
			const user = await users.findOperatorByName(username);
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: `Welcome, ${username}`, token });
			} else {
				next({ statusCode: 401, message: 'Invalid Credentials' });
			}
		} catch (error) {
			next({ statusCode: 500, message: 'Something went wrong...', error });
		}
	} else {
		next({ statusCode: 400, message: 'Missing Login Data.' });
	}
});

router.post('/diner/register', async (req, res, next) => {
	const user = req.body;
	if (isValidRegistration(user)) {
		const rounds = parseInt(process.env.ROUNDS);
		const hash = bcrypt.hashSync(user.password, rounds || 8);
		user.password = hash;

		try {
			const response = await users.addDiner(user);
			console.log(response);
			res.status(201).json(response);
		} catch (error) {
			next({ statusCode: 500, message: 'Something went wrong, try again...', error });
		}
	} else {
		next({ statusCode: 400, message: 'Missing Registration Data.' });
	}
});

router.post('/operator/register', async (req, res, next) => {
	const user = req.body;
	if (isValidRegistration(user)) {
		const rounds = parseInt(process.env.ROUNDS);
		const hash = bcrypt.hashSync(user.password, rounds || 8);
		user.password = hash;

		try {
			const response = await users.addOperator(user);
			console.log(response)
			res.status(201).json(response);
		} catch (error) {
			next({ statusCode: 500, message: 'Something went wrong, try again...', error });
		}
	} else {
		next({ statusCode: 400, message: 'Missing Registration Data.' });
	}
});

//For Testing
router.get('/', async (req, res, next) => {
  try {
		const diners = await users.getDiners();
		const operators = await users.getOperators()
		res.status(200).json({diners, operators})
  } catch (error) {
    next({ statusCode: 500, message: 'Something went wrong, try again...', error })
  }
})

module.exports = router;
