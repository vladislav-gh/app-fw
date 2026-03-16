import { isServer, QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

const makeQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000,
				gcTime: 10 * 60 * 1000,
				refetchOnWindowFocus: false,
				retry: 1,
			},
		},
	});

export const getQueryClient = () => {
	if (isServer) {
		return makeQueryClient();
	}

	if (!browserQueryClient) {
		browserQueryClient = makeQueryClient();
	}

	return browserQueryClient;
};
