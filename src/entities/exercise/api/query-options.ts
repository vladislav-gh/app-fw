import { queryOptions } from "@tanstack/react-query";

import { getExercisesUser } from "./actions";
import { QUERY_KEYS_EXERCISE } from "./query-keys";

export const getQueryOptionsExercisesUser = (userId: string) =>
	queryOptions({
		queryKey: QUERY_KEYS_EXERCISE.user(userId),
		queryFn: getExercisesUser,
		enabled: !!userId,
	});
