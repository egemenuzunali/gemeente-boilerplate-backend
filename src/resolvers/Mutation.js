const createUser = require('../lib/createUser');
const signIn = require('../lib/signIn');
const doResetPassword = require('../lib/resetPassword');
const requestReset = require('../lib/requestReset');

const Mutations = {
	async signUp(parent, args, ctx, info) {
		const user = await createUser(args, ctx, info);
		return user;
	},
	async signIn(parent, args, ctx, info) {
		const user = await signIn(args, ctx, info);
		return user;
	},
	signOut(parent, args, ctx) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye !!' };
	},
	async requestReset(parent, args, ctx, info) {
		return requestReset(args, ctx, info);
	},
	async resetPassword(parent, args, ctx, info) {
		const updatedUser = await doResetPassword(args, ctx, info);
		return updatedUser;
	},
};

module.exports = Mutations;
