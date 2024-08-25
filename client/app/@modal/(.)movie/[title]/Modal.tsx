"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const dialogRef = useRef<ElementRef<"dialog">>(null);

	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, []);

	function onDismiss() {
		router.back();
	}

	return createPortal(
		<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
			<dialog
				ref={dialogRef}
				className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 max-h-[90vh] overflow-y-auto"
				onClose={onDismiss}
			>
				<div className="relative">
					{children}
					<button
						type="button"
						onClick={onDismiss}
						className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
					>
						x
					</button>
				</div>
			</dialog>
		</div>,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		document.getElementById("modal-root")!,
	);
}
