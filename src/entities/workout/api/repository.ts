import type { RepositoryGetAllOptions, RepositoryGetByIdOptions } from "@Shared/api/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
	Workout,
	WorkoutExercise,
	WorkoutExerciseRow,
	WorkoutExerciseSet,
	WorkoutExerciseSetRow,
	WorkoutRowWithExercises,
} from "../model";

import { createSupabaseRepository } from "@Shared/api/supabase";

import { mapWorkout, mapWorkoutExercise, mapWorkoutExerciseSet, mapWorkouts } from "../model";

export function createWorkoutRepository(supabase: SupabaseClient) {
	const repository = createSupabaseRepository<WorkoutRowWithExercises, Workout>(supabase, "workouts", mapWorkout);

	return {
		...repository,

		async getAll(options: RepositoryGetAllOptions = {}) {
			const { data, error } = await supabase
				.from("workouts")
				.select(
					(options.selectQuery as "*") ??
						`
                            *,
                            workout_exercises (*)
                        `,
				)
				.order("date", { ascending: false });

			if (error) throw error;

			return mapWorkouts(data);
		},

		getById: async (options: RepositoryGetByIdOptions) =>
			repository.getById({
				...options,
				selectQuery:
					options.selectQuery ??
					`
                    *,
                    workout_exercises (
                        *,
                        workout_exercise_sets (*)
                    )
                `,
			}),
	};
}

export function createWorkoutExerciseRepository(supabase: SupabaseClient) {
	const repository = createSupabaseRepository<WorkoutExerciseRow, WorkoutExercise>(
		supabase,
		"workout_exercises",
		mapWorkoutExercise,
	);

	return {
		...repository,
	};
}

export function createWorkoutExerciseSetRepository(supabase: SupabaseClient) {
	const repository = createSupabaseRepository<WorkoutExerciseSetRow, WorkoutExerciseSet>(
		supabase,
		"workout_exercise_sets",
		mapWorkoutExerciseSet,
	);

	return {
		...repository,
	};
}
