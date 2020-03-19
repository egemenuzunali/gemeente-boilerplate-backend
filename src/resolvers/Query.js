// db calls come here
const Query = {
	async getCurrentUser(parent, args, ctx, info) {
		const user = await ctx.user;
		if (!user) {
			return null;
		}
		return ctx.db.models.user.findOne(
			{
				where: { id: user.id },
			},
			info
		);
	},
};

module.exports = Query;
