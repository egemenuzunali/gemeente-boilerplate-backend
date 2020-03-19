const { generateToken } = require('./utils');
const bCrypt = require('bcryptjs');

async function createUser(args, ctx, info) {
	// lowercase email
	args.email = args.email.toLowerCase();
	// check passwords for match
	if (args.password !== args.passwordConfirm) {
		throw new Error("Passwords don't match");
	}
	// hash received password
	const password = await bCrypt.hash(args.password, 10);
	// create a user in the data base
	const user = await ctx.db.models.user.create(
		{
			...args,
			password,
		},
		info
	);
	// generate token
	const token = generateToken(user.id);
	return { user, token };
}

module.exports = createUser;
