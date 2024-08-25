"use client";
import { graphql } from "../graphql/gql";
import { useQuery } from "@apollo/client";

const MoviesDocument = graphql(`
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
	const { data } = useQuery(MoviesDocument);
	const movies = data?.movies || [];

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>mooviews</h1>
			<section className="flex flex-wrap justify-center">
				{movies.map((movie) => (
					<article key={movie.id} className="m-4 p-4 border">
						<h2>{movie.title}</h2>
						<p>{movie.year}</p>
						<p>{movie.overallRating}</p>
					</article>
				))}
			</section>
		</main>
	);
}
