import type { PropsWithChildren } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@Shared/api/query";
import { getQueryOptionsExercisesSystem } from "@Entities/exercise";
import { getQueryOptionsExerciseCategoriesSystem } from "@Entities/exercise-category";

export async function ProviderGlobalData(props: PropsWithChildren) {
	const queryClient = getQueryClient();

	// WARNING: Only add prefetchQueries that use public repositories.
	// Queries that access cookies() (e.g. authenticated requests) will break static generation.
	await Promise.all([
		queryClient.prefetchQuery(getQueryOptionsExerciseCategoriesSystem()),
		queryClient.prefetchQuery(getQueryOptionsExercisesSystem()),
	]);

	return <HydrationBoundary state={dehydrate(queryClient)} {...props} />;
}
