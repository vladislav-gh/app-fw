import { useMemo } from "react";
import { useWindowSize } from "react-use";

import { BREAKPOINTS, IS_CLIENT } from "@Shared/config";

type CurrentScreensStateModel = {
	isXs: boolean;
	isSm: boolean;
	isMd: boolean;
	isLg: boolean;
	isXl: boolean;
	is2xl: boolean;
	is3xl: boolean;
};

const getCurrentScreensState = (): CurrentScreensStateModel => ({
	isXs: IS_CLIENT && innerWidth >= BREAKPOINTS.xs,
	isSm: IS_CLIENT && innerWidth >= BREAKPOINTS.sm,
	isMd: IS_CLIENT && innerWidth >= BREAKPOINTS.md,
	isLg: IS_CLIENT && innerWidth >= BREAKPOINTS.lg,
	isXl: IS_CLIENT && innerWidth >= BREAKPOINTS.xl,
	is2xl: IS_CLIENT && innerWidth >= BREAKPOINTS["2xl"],
	is3xl: IS_CLIENT && innerWidth >= BREAKPOINTS["3xl"],
});

export const useScreens = () => {
	const { width } = useWindowSize();

	const screens = useMemo(() => getCurrentScreensState(), [width]);

	return screens;
};
