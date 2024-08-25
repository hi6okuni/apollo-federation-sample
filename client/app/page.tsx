"use client";
import { Suspense } from "react";
import { Movies } from "./components/Movies";
import Loading from "./loading";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>mooviews</h1>
			<Suspense fallback={<Loading />}>
				<Movies />
			</Suspense>
		</main>
	);
}
