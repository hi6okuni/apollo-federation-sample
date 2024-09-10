"use client";

import { graphql } from "../../graphql/gql";
import { useSuspenseQuery } from "@apollo/client";
import { ViewTransitionsLink } from "@/shared/components/ViewTransitionLink";
import { useState } from "react";

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

	const [targetTitle, setTargetTitle] = useState<string>("");

	return (
		<section className="flex flex-wrap justify-center">
			{movies.map((movie) => (
				<article key={movie.id} className="m-4 p-4 border">
					<ViewTransitionsLink
						href={`/movie/${formatTitleForUrl(movie.title ?? "")}`}
						onMouseOver={() => setTargetTitle(movie.title ?? "")}
						onMouseLeave={() => setTargetTitle("")}
						prefetch={false}
					>
						{movie.title}
					</ViewTransitionsLink>
					<h2
						className={`${targetTitle === movie.title ? "[view-transition-name:title]" : ""}`}
					>
						{movie.title}
					</h2>
					<p>{movie.year}</p>
					<p>{movie.overallRating}</p>
				</article>
			))}
		</section>
	);
};

const formatTitleForUrl = (title: string) =>
	title.toLowerCase().replace(/ /g, "-");
