"use client";

import type { PropsWithChildren } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@Shared/api/query";

export function ProviderQuery({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={getQueryClient()}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
