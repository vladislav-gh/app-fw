"use client";

import type { ImageProps as NextImageProps } from "next/image";
import type { FC } from "react";
import type { ImageProps } from "./Image";

import NextImage from "next/image";
import { useMemo, useState } from "react";

import { Spinner } from "@Shared/ui";

export type ImageWithLoaderProps = Pick<ImageProps, "classNames"> & NextImageProps;

export const ImageWithLoader: FC<ImageWithLoaderProps> = ({ classNames, src, ...restProps }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const memoImage = useMemo(
		() =>
			src ? (
				<NextImage
					src={src}
					{...restProps}
					onLoad={e => {
						if (restProps.onLoad) {
							restProps.onLoad(e);
						}

						setIsLoading(false);
					}}
					onError={e => {
						if (restProps.onError) {
							restProps.onError(e);
						}

						setIsLoading(false);
					}}
				/>
			) : null,
		[src],
	);

	if (!src) {
		return null;
	}

	return (
		<div className={classNames?.wrapper}>
			{isLoading && (
				<div className={classNames?.loader}>
					<Spinner className={classNames?.spinner} />
				</div>
			)}

			{memoImage}
		</div>
	);
};
