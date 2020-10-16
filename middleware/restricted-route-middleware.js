const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'fda2weea/* 322s */';

module.exports = () => {
	return (req, res, next) => {
	// console.log(req.headers.authorization);
	if (req.headers.authorization) {
		const [directive, token] = req.headers.authorization.split(' ');
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				console.log(err);
				next({ statusCode: 401, message: 'Invalid Credentials!!' });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		next({ statusCode: 401, message: 'Invalid Credentials' });
	}
};
}
