import type { ElProps } from "@Shared/types";
import type { VariantProps } from "class-variance-authority";
import type { FC } from "react";
import type { IconsKeys } from "./collection";

import { cva } from "class-variance-authority";

import { twcx } from "@Shared/utils";

import { IconsCollection } from "./collection";
import styles from "./styles.module.css";

type IconVariantsProps = VariantProps<typeof iconVariants>;

const iconVariants = cva([styles.component, "block size-[1em] max-w-none shrink-0 text-[1em] leading-none"], {
	variants: {
		size: {
			sm: "text-[24px]",
			md: "text-[32px]",
			lg: "text-[48px]",
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

export const Icon: FC<IconProps> = ({ className, k, ...restProps }) => {
	const Component = IconsCollection[k];

	if (!Component) {
		return null;
	}

	return <Component className={twcx(icon(restProps), className)} {...restProps} />;
};
