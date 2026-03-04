import type { ClassValue } from "clsx";

import clsx from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [],
			"text-color": [],
		},
	},
});

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));
