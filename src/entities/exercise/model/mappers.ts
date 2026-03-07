import type { Exercise, ExerciseRowWithCategories } from "./types";

import { mapExerciseCategory } from "@Entities/exercise-category";

export const mapExercise = (row: ExerciseRowWithCategories): Exercise => ({
	id: row.id,
	slug: row.slug,
	name: row.name,
	description: row.description,
	isSystem: row.is_system,
	categories: row.exercise_category_map.map(item => mapExerciseCategory(item.exercise_categories)),
});

export const mapExercises = (rows: ExerciseRowWithCategories[]): Exercise[] => rows.map(mapExercise);
