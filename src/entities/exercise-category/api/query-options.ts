import { queryOptions } from "@tanstack/react-query";

import { getExerciseCategoriesSystem, getExerciseCategoriesUser } from "./actions";
import { QUERY_KEYS_EXERCISE_CATEGORY } from "./query-keys";

export const getQueryOptionsExerciseCategoriesSystem = () =>
	queryOptions({
		queryKey: QUERY_KEYS_EXERCISE_CATEGORY.system,
		queryFn: getExerciseCategoriesSystem,
	});

export const getQueryOptionsExerciseCategoriesUser = (userId: string) =>
	queryOptions({
		queryKey: QUERY_KEYS_EXERCISE_CATEGORY.user(userId),
		queryFn: getExerciseCategoriesUser,
		enabled: !!userId,
	});
