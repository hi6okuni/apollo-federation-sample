import { Modal } from "./Modal";

export default function Page({ params }: { params: { title: string } }) {
	return (
		<Modal>
			<h1>{params.title}</h1>
		</Modal>
	);
}
