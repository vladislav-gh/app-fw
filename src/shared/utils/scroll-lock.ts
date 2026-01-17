import { IS_SERVER } from "@Shared/config";

const SCROLL_LOCK_CLASSNAME = "is-scroll-locked";

let dataScrollLocks: Set<string> | undefined;

export function scrollLock(state: boolean, name: string) {
	if (IS_SERVER) {
		return;
	}

	if (state) {
		if (typeof dataScrollLocks === "undefined") {
			dataScrollLocks = new Set();
		}

		dataScrollLocks.add(name);

		document.documentElement.classList.add(SCROLL_LOCK_CLASSNAME);
	} else {
		dataScrollLocks?.delete(name);

		if (!dataScrollLocks?.size) {
			document.documentElement.classList.remove(SCROLL_LOCK_CLASSNAME);
		}
	}
}
