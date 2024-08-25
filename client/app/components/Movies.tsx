"use client";
import Link from "next/link";
import { graphql } from "../../graphql/gql";
import { useSuspenseQuery } from "@apollo/client";

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

export const Movies = () => {
	const { data } = useSuspenseQuery(MoviesDocument);
	const movies = data?.movies || [];

	return (
		<section className="flex flex-wrap justify-center">
			{movies.map((movie) => (
				<article key={movie.id} className="m-4 p-4 border">
					<Link href={`/movie/${formatTitleForUrl(movie.title ?? "")}`}>
						{movie.title}
					</Link>
					<h2>{movie.title}</h2>
					<p>{movie.year}</p>
					<p>{movie.overallRating}</p>
				</article>
			))}
		</section>
	);
};

const formatTitleForUrl = (title: string) =>
	title.toLowerCase().replace(/ /g, "-");
