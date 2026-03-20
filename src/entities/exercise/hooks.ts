import { useQuery } from "@tanstack/react-query";

import { useUser } from "@Entities/user";

import { getQueryOptionsExercisesSystem, getQueryOptionsExercisesUser } from "./api";

export function useExercisesAll() {
	const user = useUser();

	const { data: exercisesSystem } = useQuery({
		...getQueryOptionsExercisesSystem(),
		staleTime: Infinity,
	});

	const { data: exercisesUser } = useQuery({
		...getQueryOptionsExercisesUser(user?.id ?? ""),
	});

	return [...(exercisesSystem ?? []), ...(exercisesUser ?? [])];
}
