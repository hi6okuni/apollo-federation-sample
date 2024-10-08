"use client";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
	ssrMode: false,
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
