import type { Database } from "@Shared/api/supabase";

export type ExerciseCategoryRow = Database["public"]["Tables"]["exercise_categories"]["Row"];

export interface ExerciseCategory {
	id: string;
	slug: string | null;
	name: string | null;
	isSystem: boolean;
}
