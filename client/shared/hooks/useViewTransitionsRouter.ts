import { useLayoutEffect, useRef } from "react";
import { useRouter as useNextRouter, usePathname } from "next/navigation";

export const useViewTransitionsRouter = (): ReturnType<
	typeof useNextRouter
> => {
	const router = useNextRouter();
	const pathname = usePathname();

	const promiseCallbacks = useRef<Record<
		"resolve" | "reject",
		(value: any) => void
	> | null>(null);

	const transitionHelper = (updateDOM: () => Promise<void> | void) => {
		if (!document.startViewTransition) {
			return updateDOM();
		}

		document.startViewTransition(updateDOM);
	};

	useLayoutEffect(() => {
		return () => {
			if (promiseCallbacks.current) {
				promiseCallbacks.current.resolve(undefined);
				promiseCallbacks.current = null;
			}
		};
	}, [pathname]);

	return {
		...router,
		push: (...args: Parameters<typeof router.push>) => {
			transitionHelper(() => {
				const url = args[0] as string;
				if (url === pathname) {
					router.push(...args);
				} else {
					return new Promise((resolve, reject) => {
						promiseCallbacks.current = { resolve, reject };
						router.push(...args);
					});
				}
			});
		},
	};
};
