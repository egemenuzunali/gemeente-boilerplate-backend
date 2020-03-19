const bCrypt = require('bcryptjs');
const { generateToken } = require('./utils');

async function signIn(args, ctx) {
	const user = await ctx.db.models.user.findOne({
		where: { email: args.email },
	});
	if (!user) {
		throw new Error(`No such user found for email ${args.email}`);
	}
	const valid = await bCrypt.compare(args.password, user.password);
	if (!valid) {
		throw new Error('Invalid Password');
	}
	const token = generateToken(user.id);
	return { user, token };
}

module.exports = signIn;
