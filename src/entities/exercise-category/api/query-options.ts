import { queryOptions } from "@tanstack/react-query";

import { getExerciseCategoriesUser } from "./actions";
import { QUERY_KEYS_EXERCISE_CATEGORY } from "./query-keys";

export const getQueryOptionsExerciseCategoryUser = (userId: string) =>
	queryOptions({
		queryKey: QUERY_KEYS_EXERCISE_CATEGORY.user(userId),
		queryFn: () => getExerciseCategoriesUser({ userId }),
		enabled: !!userId,
	});
