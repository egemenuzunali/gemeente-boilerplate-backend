const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('./mail');

async function requestReset(args, ctx, info) {
	const user = await ctx.db.models.user.findOne({
		where: { email: args.email },
	});
	if (!user) {
		throw new Error(`No such user found for email ${args.email}`);
	}

	const randomBytesPromisified = promisify(randomBytes);
	const resetToken = (await randomBytesPromisified(20)).toString('hex');
	const resetTokenExpiry = Date.now() + 3600000;

	await ctx.db.models.user.update(
		{
			resetToken: resetToken,
			resetTokenExpiry,
		},
		{ where: { email: args.email } },
		info
	);
	console.log(resetToken);
	// email that reset token
	await transport.sendMail({
		from: 'user@amsterdam.nl',
		to: user.email,
		subject: 'Your password reset token',
		html: makeANiceEmail(
			`Your password reset token is here \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}" >Click here to reset </a>`
		),
	});
	// return message
	return { message: 'thanks' };
}

module.exports = requestReset;
