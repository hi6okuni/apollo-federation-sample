/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type Movie = {
	__typename?: "Movie";
	id: Scalars["ID"]["output"];
	overallRating?: Maybe<Scalars["Float"]["output"]>;
	reviewsForMovie: Array<Maybe<Review>>;
	title?: Maybe<Scalars["String"]["output"]>;
	year?: Maybe<Scalars["Int"]["output"]>;
};

export type MovieReviewInput = {
	comment?: InputMaybe<Scalars["String"]["input"]>;
	movieId: Scalars["ID"]["input"];
	rating?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	submitReview: SubmitReviewResponse;
};

export type MutationSubmitReviewArgs = {
	movieReview: MovieReviewInput;
};

export type Query = {
	__typename?: "Query";
	/** The three latest reviews submitted from Mooviews */
	latestReviews: Array<Review>;
	movie?: Maybe<Movie>;
	movies: Array<Movie>;
};

export type QueryMovieArgs = {
	id: Scalars["ID"]["input"];
};

export type Review = {
	__typename?: "Review";
	comment?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	movie?: Maybe<Movie>;
	rating?: Maybe<Scalars["Int"]["output"]>;
};

export type SubmitReviewResponse = {
	__typename?: "SubmitReviewResponse";
	code: Scalars["Int"]["output"];
	message: Scalars["String"]["output"];
	movieReview?: Maybe<Review>;
	success: Scalars["Boolean"]["output"];
};

export type MoviesQueryVariables = Exact<{ [key: string]: never }>;

export type MoviesQuery = {
	__typename?: "Query";
	movies: Array<{
		__typename?: "Movie";
		id: string;
		title?: string | null;
		year?: number | null;
		overallRating?: number | null;
	}>;
};

export const MoviesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "Movies" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "movies" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "title" } },
								{ kind: "Field", name: { kind: "Name", value: "year" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "overallRating" },
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;
