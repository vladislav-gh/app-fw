import type { ImageProps as NextImageProps } from "next/image";
import type { FC, RefObject } from "react";

import NextImage from "next/image";

import { BREAKPOINTS } from "@Shared/config";
import { Icon } from "@Shared/ui";
import { twcx } from "@Shared/utils";

import { ImageWithLoader } from "./WithLoader";

type ImagePropsClassNames = {
	wrapper?: string;
	loader?: string;
	spinner?: string;
	icon?: string;
};

type ImagePropsSizes = {
	default?: string;
	xs?: string;
	sm?: string;
	md?: string;
	lg?: string;
	xl?: string;
	"2xl"?: string;
	"3xl"?: string;
};

export type ImageProps = Omit<NextImageProps, "src" | "alt" | "sizes"> & {
	ref?: RefObject<HTMLImageElement>;
	classNames?: ImagePropsClassNames;
	src?: NextImageProps["src"] | null;
	alt?: string;
	sizes?: ImagePropsSizes;
	withLoader?: boolean;
};

export const Image: FC<ImageProps> = ({
	ref,
	className,
	classNames,
	src,
	alt = "",
	sizes,
	withLoader,
	...restProps
}) => {
	const getSizes = () => {
		const sizesArr = [];

		if (sizes?.["3xl"]) {
			sizesArr.push(`(min-width: ${BREAKPOINTS["3xl"]}px) ${sizes["3xl"]}`);
		}

		if (sizes?.["2xl"]) {
			sizesArr.push(`(min-width: ${BREAKPOINTS["2xl"]}px) ${sizes["2xl"]}`);
		}

		if (sizes?.xl) {
			sizesArr.push(`(min-width: ${BREAKPOINTS.xl}px) ${sizes.xl}`);
		}

		if (sizes?.lg) {
			sizesArr.push(`(min-width: ${BREAKPOINTS.lg}px) ${sizes.lg}`);
		}

		if (sizes?.md) {
			sizesArr.push(`(min-width: ${BREAKPOINTS.md}px) ${sizes.md}`);
		}

		if (sizes?.sm) {
			sizesArr.push(`(min-width: ${BREAKPOINTS.sm}px) ${sizes.sm}`);
		}

		if (sizes?.xs) {
			sizesArr.push(`(min-width: ${BREAKPOINTS.xs}px) ${sizes.xs}`);
		}

		if (sizes?.default) {
			sizesArr.push(sizes.default);
		}

		if (!sizesArr.length) {
			return;
		}

		return sizesArr.join(", ");
	};

	if (!src) {
		return (
			<div
				ref={ref}
				className={twcx(
					"bg-black-total text-white-total flex size-full items-center justify-center overflow-hidden",
					className,
				)}
			>
				<Icon className={twcx("size-3/4", classNames?.icon)} k="image" />
			</div>
		);
	}

	const imageProps = {
		ref,
		src,
		alt,
		sizes: getSizes(),
		quality: 95,
		...restProps,
	};

	return withLoader ? (
		<ImageWithLoader
			className={className}
			classNames={{
				wrapper: twcx("relative z-0 size-full", classNames?.wrapper),
				loader: twcx("absolute inset-0 z-10", classNames?.loader),
				spinner: classNames?.spinner,
			}}
			{...imageProps}
		/>
	) : (
		<NextImage className={className} {...imageProps} />
	);
};
