const Sequelize = require('sequelize');

// these should come from env vars
const Conn = new Sequelize('postgres', 'postgres', 'dbpassword', {
	host: process.env.DB_HOSTNAME || 'localhost',
	dialect: 'postgres',
	logging: false,
});

Conn.define('user', {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
		},
		unique: {
			args: true,
			msg: 'Email address already in use!',
		},
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	phoneNumber: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	resetToken: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	resetTokenExpiry: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
});

// this drops all tables
// Conn.sync({ force: true }).then(() => {});
Conn.sync()
	.then(() => {
		console.log('successfully accepted connection');
	})
	.catch((e) => {
		console.log(e);
	});

module.exports = Conn;
