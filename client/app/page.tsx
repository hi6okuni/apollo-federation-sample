"use client";
import { graphql } from "../graphql/gql";
import { useQuery } from "@apollo/client";

const getMoviesDocument = graphql(`
  query Movies {
    movies {
      id
      title
      year
      overallRating
    }
  }
  `);

export default function Home() {
	const { data } = useQuery(getMoviesDocument);
	const movies = data?.movies || [];

	console.log(movies);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			mooviews
		</main>
	);
}
