export const PAGES = {
	home: "/",
	signUp: "/sign-up",
	signIn: "/sign-in",
	forgotPassword: "/forgot-password",
	profile: "/profile",
	workouts: "/workouts",
	workout: (id: string) => `/workouts/${id}`,
	exercises: "/exercises",
	exerciseCategories: "/exercise-categories",
} as const;
