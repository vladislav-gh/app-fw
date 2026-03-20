import { useQuery } from "@tanstack/react-query";

import { useUser } from "@Entities/user";

import { getQueryOptionsExerciseCategoriesSystem, getQueryOptionsExerciseCategoriesUser } from "./api";

export function useExerciseCategoriesAll() {
	const user = useUser();

	const { data: exerciseCategoriesSystem } = useQuery({
		...getQueryOptionsExerciseCategoriesSystem(),
		staleTime: Infinity,
	});

	const { data: exerciseCategoriesUser } = useQuery({
		...getQueryOptionsExerciseCategoriesUser(user?.id ?? ""),
	});

	return [...(exerciseCategoriesSystem ?? []), ...(exerciseCategoriesUser ?? [])];
}
