import Image from "./images/image.svg";

export const IconsCollection = {
	image: Image,
} as const;

export type IconsKeys = keyof typeof IconsCollection;
