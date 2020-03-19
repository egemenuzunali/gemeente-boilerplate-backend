const jwt = require('jsonwebtoken');

function generateToken(id) {
	return jwt.sign({ userId: id }, process.env.APP_SECRET, {
		expiresIn: '2 days',
	});
}

exports.generateToken = generateToken;
