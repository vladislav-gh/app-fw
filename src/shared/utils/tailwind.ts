import type { ClassValue } from "clsx";

import cx from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [
				"text-h1",
				"text-h1-d",
				"text-h2",
				"text-h2-d",
				"text-h3",
				"text-h3-d",
				"text-h4",
				"text-h4-d",
				"text-h5",
				"text-h5-d",
				"text-h6",
				"text-h6-d",
				"text-body",
				"text-body-d",
				"text-small",
				"text-small-d",
				"text-caption",
				"text-caption-d",
			],
			"text-color": [
				"text-black",
				"text-black-total",
				"text-white",
				"text-white-total",
				"text-text",
				"text-background",
				"text-primary",
				"text-secondary",
				"text-accent",
			],
		},
	},
});

export const twcx = (...args: ClassValue[]) => twMerge(cx(args));
