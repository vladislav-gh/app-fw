import { queryOptions } from "@tanstack/react-query";

import { getWorkouts } from "./actions";
import { QUERY_KEYS_WORKOUT } from "./query-keys";

export const getQueryOptionsWorkoutsAll = (userId: string) =>
	queryOptions({
		queryKey: QUERY_KEYS_WORKOUT.all(userId),
		queryFn: getWorkouts,
		enabled: !!userId,
	});
