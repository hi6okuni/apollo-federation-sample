"use client";

import { Suspense } from "react";
import { Movies } from "./components/Movies";
import Loading from "./loading";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex items-center">
				<div className="h-10 w-10 bg-tv-color-bar rounded-sm" />
				<div>Martin Scorsese</div>
			</div>
			<Suspense fallback={<Loading />}>
				<Movies />
			</Suspense>
		</main>
	);
}
