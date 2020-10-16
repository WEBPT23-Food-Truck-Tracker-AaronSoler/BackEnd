const jwt = require('jsonwebtoken');

const generateToken = (user) => {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department,
	};
	const secret = process.env.JWT_SECRET || 'fda2weea/* 322s */';
	const options = {
		expiresIn: process.env.TOKEN_EXP || '1d',
	};

	const token = jwt.sign(payload, secret, options);
	return token;
};

module.exports = generateToken;