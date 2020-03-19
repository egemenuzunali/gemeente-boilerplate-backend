const { generateToken } = require('./utils');
const bCrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function resetPassword(args, ctx) {
	if (args.password !== args.confirmPassword) {
		throw new Error("Yo Passwords don't match!");
	}

	const [user] = await ctx.db.models.user.findAll({
		where: {
			resetToken: args.resetToken,
			resetTokenExpiry: { [Op.gte]: Date.now() - 3600000 },
		},
	});

	if (!user) {
		throw new Error('This token is either invalid or expired!');
	}

	const password = await bCrypt.hash(args.password, 10);
	await ctx.db.models.user.update(
		{
			password,
			resetToken: null,
			resetTokenExpiry: null,
		},
		{ where: { email: user.email } }
	);

	const updatedUser = await ctx.db.models.user.findOne({
		where: { email: user.email },
	});
	const token = generateToken(updatedUser.id);

	return { user, token };
}

module.exports = resetPassword;
