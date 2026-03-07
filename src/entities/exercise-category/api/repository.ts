import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExerciseCategory, ExerciseCategoryRepositoryGetUserOptions, ExerciseCategoryRow } from "../model";

import { createSupabaseRepository } from "@Shared/api/supabase";

import { mapExerciseCategories, mapExerciseCategory } from "../model";

export function createExerciseCategoryRepository(supabase: SupabaseClient) {
	const repository = createSupabaseRepository<ExerciseCategoryRow, ExerciseCategory>(
		supabase,
		"exercise_categories",
		mapExerciseCategory,
	);

	return {
		...repository,

		async getSystem() {
			const { data, error } = await supabase
				.from("exercise_categories")
				.select("*")
				.eq("is_system", true)
				.order("sort_index");

			if (error) throw error;

			return mapExerciseCategories(data);
		},

		async getUser({ userId }: ExerciseCategoryRepositoryGetUserOptions) {
			const { data, error } = await supabase
				.from("exercise_categories")
				.select("*")
				.eq("user_id", userId)
				.order("sort_index");

			if (error) throw error;

			return mapExerciseCategories(data);
		},
	};
}
