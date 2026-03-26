"use client";

import { useScreens } from "@Shared/hooks";
import { Toaster as ShadcnToaster } from "@Shared/ui/shadcn/components/ui/sonner";

export function Toaster() {
	const { isLg } = useScreens();

	return <ShadcnToaster position={isLg ? "top-right" : "top-center"} />;
}
