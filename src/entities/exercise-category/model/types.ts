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

export interface ExerciseCategoryCreateDTO {
	name: string;
}

export interface ExerciseCategoryUpdateDTO extends Partial<ExerciseCategoryCreateDTO> {
	categoryId: string;
}

export interface ExerciseCategoryDeleteDTO {
	categoryId: string;
}
