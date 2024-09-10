"use client";

export default function Page({ params }: { params: { title: string } }) {
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="[view-transition-name:title]">{params.title}</div>
		</div>
	);
}
