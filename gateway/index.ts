import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const gateway = new ApolloGateway({
	supergraphSdl: new IntrospectAndCompose({
		subgraphs: [
			{ name: "reviews", url: "http://localhost:4001/query" },
			{ name: "movies", url: "http://localhost:4002/query" },
		],
	}),
});

const server = new ApolloServer({
	gateway,
});

const startServer = async () => {
	const { url } = await startStandaloneServer(server);
	console.log(`🚀 Server ready at ${url}`);
};

startServer();
