import type { ElProps } from "@Shared/types";
import type { VariantProps } from "class-variance-authority";
import type { IconsKeys } from "./collection";

import { cva } from "class-variance-authority";

import { twcx } from "@Shared/utils";

import { IconsCollection } from "./collection";
import styles from "./styles.module.css";

type IconVariantsProps = VariantProps<typeof iconVariants>;

const iconVariants = cva([styles.component, "block size-[1em] max-w-none shrink-0 text-[1em] leading-none"], {
	variants: {
		size: {
			sm: "text-[1.25rem]",
			md: "text-[1.5rem]",
			lg: "text-[1.75rem]",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

const icon = (variants: IconVariantsProps) => iconVariants(variants);

export type IconProps = ElProps<"svg", keyof IconVariantsProps> &
	IconVariantsProps & {
		k: IconsKeys;
	};

export function Icon({ className, k, ...restProps }: IconProps) {
	const Component = IconsCollection[k];

	if (!Component) {
		return null;
	}

	return <Component className={twcx(icon(restProps), className)} {...restProps} />;
}
