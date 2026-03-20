import { queryOptions } from "@tanstack/react-query";

import { getExercisesSystem, getExercisesUser } from "./actions";
import { QUERY_KEYS_EXERCISE } from "./query-keys";

export const getQueryOptionsExercisesSystem = () =>
	queryOptions({
		queryKey: QUERY_KEYS_EXERCISE.system,
		queryFn: getExercisesSystem,
	});

export const getQueryOptionsExercisesUser = (userId: string) =>
	queryOptions({
		queryKey: QUERY_KEYS_EXERCISE.user(userId),
		queryFn: getExercisesUser,
		enabled: !!userId,
	});
