interface ViewTransition {
	ready: Promise<void>;
	finished: Promise<void>;
	updateCallbackDone: Promise<void>;
}

interface Document {
	startViewTransition?: (cb: () => Promise<void> | void) => ViewTransition;
}
