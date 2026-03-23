const QUERY_KEY = "workout";

export const QUERY_KEYS_WORKOUT = {
	all: (userId: string) => [QUERY_KEY, "all", userId],
	workout: (workoutId: string) => [QUERY_KEY, "workout", workoutId],
} as const;
