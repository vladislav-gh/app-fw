import type { ElProps } from "@Shared/types";
import type { VariantProps } from "class-variance-authority";
import type { FC } from "react";

import { cva } from "class-variance-authority";

import { twcx } from "@Shared/utils";

type TextVariants = VariantProps<typeof textVariants>;

const textVariants = cva("", {
	variants: {
		variant: {
			h1: "text-h1-d lg:text-h1",
			h2: "text-h2-d lg:text-h2",
			h3: "text-h3-d lg:text-h3",
			h4: "text-h4-d lg:text-h4",
			h5: "text-h5-d lg:text-h5",
			h6: "text-h6-d lg:text-h6",
			body: "text-body-d lg:text-body",
			small: "text-small-d lg:text-small",
			caption: "text-caption-d lg:text-caption",
		},
		family: {
			primary: "font-primary",
		},
		weight: {
			300: "font-light",
			400: "font-normal",
			500: "font-medium",
			600: "font-semibold",
			700: "font-bold",
		},
		uppercase: {
			true: "uppercase",
		},
		italic: {
			true: "italic",
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
		},
		color: {
			current: "text-current",
			transparent: "text-transparent",
			black: "text-black",
			blackTotal: "text-black-total",
			white: "text-white",
			whiteTotal: "text-white-total",
			text: "text-text",
			background: "text-background",
			primary: "text-primary",
			secondary: "text-secondary",
			accent: "text-accent",
		},
	},
	defaultVariants: {
		variant: "body",
	},
});

const text = (variants: TextVariants) => textVariants(variants);

export type TextProps = ElProps<"div", keyof TextVariants> &
	TextVariants & {
		as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	};

export const Text: FC<TextProps> = ({
	ref,
	className,
	as = "div",
	variant,
	family,
	weight,
	uppercase,
	italic,
	align,
	color,
	...restProps
}) => {
	const Component = as;

	return (
		<Component
			ref={ref}
			className={twcx(text({ variant, family, weight, uppercase, italic, align, color }), className)}
			{...restProps}
		/>
	);
};
