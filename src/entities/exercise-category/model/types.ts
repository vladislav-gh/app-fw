import type { Database } from "@Shared/api/supabase";

export type ExerciseCategoryRow = Database["public"]["Tables"]["exercise_categories"]["Row"];

export interface ExerciseCategory {
	id: string;
	slug: string | null;
	name: string | null;
	isSystem: boolean;
}

export interface ExerciseCategoryRepositoryGetUserOptions {
	userId: string;
}

export interface ExerciseCategoryGetUserDTO {
	userId: string;
}

export interface ExerciseCategoryCreateDTO {
	userId: string;
	name: string;
}

export interface ExerciseCategoryUpdateDTO {
	categoryId: string;
	name: string;
}

export interface ExerciseCategoryDeleteDTO {
	categoryId: string;
}
