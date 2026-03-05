import type { ExerciseCategory, ExerciseCategoryRow } from "./types";

export const mapExerciseCategory = (row: ExerciseCategoryRow): ExerciseCategory => ({
	id: row.id,
	slug: row.slug,
	name: row.name,
	isSystem: row.is_system,
});

export const mapExerciseCategories = (rows: ExerciseCategoryRow[]): ExerciseCategory[] => rows.map(mapExerciseCategory);
