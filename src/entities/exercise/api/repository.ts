import type { RepositoryGetAllOptions, RepositoryGetByIdOptions } from "@Shared/api/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
	Exercise,
	ExerciseRepositoryGetUserOptions,
	ExerciseRepositoryInsertOptions,
	ExerciseRepositoryUpdateOptions,
	ExerciseRowWithCategories,
} from "../model";

import { createSupabaseRepository } from "@Shared/api/supabase";

import { mapExercise, mapExercises } from "../model";

const SELECT_QUERY = `
	*,
	exercise_category_map (
		exercise_categories (*)
	)
`;

export function createExerciseRepository(supabase: SupabaseClient) {
	const repository = createSupabaseRepository<ExerciseRowWithCategories, Exercise>(supabase, "exercises", mapExercise);

	return {
		...repository,

		getAll: async (options: RepositoryGetAllOptions = {}) =>
			repository.getAll({ ...options, selectQuery: options.selectQuery ?? SELECT_QUERY }),

		getById: async (options: RepositoryGetByIdOptions) =>
			repository.getById({ ...options, selectQuery: options.selectQuery ?? SELECT_QUERY }),

		async getSystem() {
			const { data, error } = await supabase
				.from("exercises")
				.select(SELECT_QUERY)
				.eq("is_system", true)
				.order("sort_index");

			if (error) throw error;

			return mapExercises(data);
		},

		async getUser({ userId }: ExerciseRepositoryGetUserOptions) {
			const { data, error } = await supabase
				.from("exercises")
				.select(SELECT_QUERY)
				.eq("user_id", userId)
				.order("sort_index");

			if (error) throw error;

			return mapExercises(data);
		},

		async insert({ payload, categoryIds }: ExerciseRepositoryInsertOptions) {
			const { data, error } = await supabase.from("exercises").insert(payload).select().single();

			if (error) throw error;

			if (categoryIds?.length) {
				const { error: errorInsertCategories } = await supabase
					.from("exercise_category_map")
					.insert(categoryIds.map(categoryId => ({ exercise_id: data.id, category_id: categoryId })));

				if (errorInsertCategories) throw errorInsertCategories;
			}

			return await this.getById({ id: data.id });
		},

		async update({ id, payload, categoryIds }: ExerciseRepositoryUpdateOptions) {
			if (payload) {
				const { error } = await supabase.from("exercises").update(payload).eq("id", id);

				if (error) throw error;
			}

			if (categoryIds?.length) {
				const { error: errorDeleteCategories } = await supabase
					.from("exercise_category_map")
					.delete()
					.eq("exercise_id", id);

				if (errorDeleteCategories) throw errorDeleteCategories;

				const { error: errorInsertCategories } = await supabase
					.from("exercise_category_map")
					.insert(categoryIds.map(categoryId => ({ exercise_id: id, category_id: categoryId })));

				if (errorInsertCategories) throw errorInsertCategories;
			}

			return await this.getById({ id });
		},
	};
}
