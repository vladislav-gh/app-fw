const QUERY_KEY = "exercise";

export const QUERY_KEYS_EXERCISE = {
	system: [QUERY_KEY, "system"],
	user: (userId: string) => [QUERY_KEY, "user", userId],
} as const;
