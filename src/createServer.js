const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

const typeDefs = gql`
	${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`;

const getUser = async (headerToken) => {
	if (!headerToken) {
		return null;
	}
	const token = jwt.verify(headerToken, process.env.APP_SECRET);
	const user = await userQuery(token.userId);

	return user;
};

const userQuery = async (userId) => {
	return await db.models.user.findOne({
		where: { id: userId },
	});
};

function createServer() {
	return new ApolloServer({
		cors: {
			origin: process.env.FRONTEND_URL,
			credentials: true,
		},
		typeDefs,
		resolvers: {
			Mutation,
			Query,
		},
		resolverValidationOptions: {
			requireResolversForResolverType: false,
		},
		context: ({ req }) => {
			const token = req.headers.authorization || '';
			const user = getUser(token);
			return { user, db };
		},
	});
}

module.exports = createServer;
