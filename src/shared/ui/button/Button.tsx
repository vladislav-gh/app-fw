"use client";

import type { ElProps } from "@Shared/types";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { cva, type VariantProps } from "class-variance-authority";

import { Link, type LinkProps, Spinner } from "@Shared/ui";
import { twcx } from "@Shared/utils";

type ButtonVariants = VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
	[
		"relative z-0 inline-flex cursor-pointer appearance-none items-center justify-center gap-1 overflow-hidden rounded-none border-0 p-0 text-center leading-none font-bold tracking-normal whitespace-nowrap uppercase no-underline shadow-none transition-all",
		"disabled:cursor-not-allowed disabled:opacity-60 disabled:select-none",
	],
	{
		variants: {
			variant: {
				primary: [
					"text-p1-d h-[60px] justify-between gap-2 rounded-xl bg-white pr-3 pl-[15px] text-left text-black",
					"lg:text-p1 lg:h-[68px]",
					"lg:[&:not(:disabled)]:hover:text-blue-bright",
				],
				secondary: [
					"text-p2-d h-9 rounded-lg bg-white px-3 text-black",
					"lg:text-p2 lg:h-10 lg:rounded-xl lg:px-4",
					"lg:[&:not(:disabled)]:hover:text-blue-bright",
				],
				tertiary: [
					"bg-blue-bright text-p1-d h-[60px] rounded-xl px-4 text-white",
					"lg:text-p1 lg:h-[68px]",
					"lg:[&:not(:disabled)]:hover:text-blue-bright lg:[&:not(:disabled)]:hover:bg-white",
				],
			},
			block: {
				true: "flex w-full",
			},
			disabled: {
				true: "cursor-not-allowed opacity-60 select-none",
			},
			loading: {
				true: "cursor-wait opacity-60 select-none",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

const button = (variants: ButtonVariants) => buttonVariants(variants);

interface ButtonPropsClassNames {
	spinner?: string;
	textIconContainer?: string;
	textIconIcon?: string;
	textIconWrapper?: string;
	textIconText?: string;
}

export type ButtonProps = ElProps<"button", keyof ButtonVariants & LinkProps> &
	ComponentPropsWithRef<"button"> &
	ButtonVariants &
	Omit<LinkProps, "ref"> & {
		classNames?: ButtonPropsClassNames;
		enableDelay?: number;
		loadingContent?: ReactNode;
	};

export function Button({
	ref,
	className,
	classNames,
	enableDelay,
	loadingContent,
	type = "button",
	variant,
	block,
	loading,
	disabled,
	children,
	...restProps
}: ButtonProps) {
	const [isDisabled, setIsDisabled] = useState<boolean>(!!disabled);

	const propDisabled = enableDelay ? isDisabled : disabled;

	const commonProps = {
		ref,
		className: twcx(button({ variant, block, disabled: propDisabled, loading, ...restProps }), className),
		disabled: propDisabled,
		...restProps,
	};

	let content = children;

	if (loading) {
		content = loadingContent ?? <Spinner className={twcx(classNames?.spinner)} />;
	}

	useUpdateEffect(() => {
		let enableDelayTimeout: ReturnType<typeof setTimeout>;

		if (enableDelay) {
			if (disabled) {
				setIsDisabled(true);
			} else {
				enableDelayTimeout = setTimeout(() => {
					setIsDisabled(false);
				}, enableDelay);
			}
		}

		return () => clearTimeout(enableDelayTimeout);
	}, [disabled]);

	if (restProps.href) {
		return (
			<Link {...commonProps} ref={ref as LinkProps["ref"]}>
				{content}
			</Link>
		);
	}

	return (
		<button type={type} {...commonProps}>
			{content}
		</button>
	);
}
