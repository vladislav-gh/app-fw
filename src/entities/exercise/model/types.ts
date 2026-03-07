import type { ExerciseCategory, ExerciseCategoryRow } from "@Entities/exercise-category";
import type { Database, RepositoryInsertOptions, RepositoryUpdateOptions } from "@Shared/api/supabase";

export type ExerciseRow = Database["public"]["Tables"]["exercises"]["Row"];

export interface ExerciseRowWithCategories extends ExerciseRow {
	exercise_category_map: {
		exercise_categories: ExerciseCategoryRow;
	}[];
}

export interface Exercise {
	id: string;
	slug: string | null;
	name: string | null;
	description: string | null;
	isSystem: boolean;
	categories: ExerciseCategory[];
}

export interface ExerciseRepositoryGetUserOptions {
	userId: string;
}

export interface ExerciseRepositoryInsertOptions extends RepositoryInsertOptions<Partial<ExerciseRow>> {
	categoryIds?: string[];
}

export interface ExerciseRepositoryUpdateOptions extends RepositoryUpdateOptions<Partial<ExerciseRow>> {
	categoryIds?: string[];
}

export interface ExerciseGetUserDTO {
	userId: string;
}

export interface ExerciseCreateDTO {
	userId: string;
	name: string;
	description?: string;
	categoryIds?: string[];
}

export interface ExerciseUpdateDTO extends Omit<ExerciseCreateDTO, "userId"> {
	exerciseId: string;
}

export interface ExerciseDeleteDTO {
	exerciseId: string;
}
