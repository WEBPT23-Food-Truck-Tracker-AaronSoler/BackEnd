const isValidRegistration = (user) => {
	return Boolean(
		typeof user.username === 'string' &&
			typeof user.password === 'string' &&
			typeof user.email === 'string' &&
			typeof user.first_name === 'string' &&
			typeof user.last_name === 'string' 
	);
};

const isValidLogin = (user) => {
	return Boolean(
		typeof user.username === 'string' && typeof user.password === 'string'
	);
};

module.exports = {
	isValidRegistration,
	isValidLogin,
};
